/**
 * JsonSearch - https://www.npmjs.com/package/search-array
 * @license MIT
 */
import tokenizeQuery from './QueryTokenizer.js'

/**
 * Escape regex special characters in srting
 * @param  {string} input string
 * @return {String} escpaed string
 */
function RegExpEscape (string) {
  return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

/**
 * Escape regex special characters in srting
 * @param  {query} input search queries
 * @param  {searchKeys} Array of acceptable search keys
 * @param  {searchKeysToObjectKeyMap} map of searchKeys to object keys
 * @return {Object} regexes based on query and keys
 */
function filterQueries (query, searchKeys, searchKeysToObjectKeyMap) {
  const tokens = tokenizeQuery(query, searchKeys)

  const containsTextRegex = tokens.filter(token => token.key === undefined && !token.isNegate).map(token => RegExpEscape(token.q)).join('|')
  const notcontainsTextRegex = tokens.filter(token => token.key === undefined && token.isNegate).map(token => RegExpEscape(token.q)).join('|')
  const containsKeyRegexs = tokens.filter(token => token.key !== undefined && !token.isNegate).map(token => { return { key: searchKeysToObjectKeyMap[token.key], regex: new RegExp(RegExpEscape(token.q), 'i') } })
  const notContainsKeyRegexs = tokens.filter(token => token.key !== undefined && token.isNegate).map(token => { return { key: searchKeysToObjectKeyMap[token.key], regex: new RegExp(RegExpEscape(token.q), 'i') } })

  return {
    textSearch: containsTextRegex ? new RegExp(containsTextRegex, 'i') : undefined,
    textSearchNegate: notcontainsTextRegex ? new RegExp(notcontainsTextRegex, 'i') : undefined,
    keySearch: containsKeyRegexs,
    keySearchNegate: notContainsKeyRegexs
  }
}

/**
 * Test the value against the regex. It automatically detects type of value (Array or String) and performs apropriate test
 * @param  {value} String or Array to test the regex in
 * @param  {regex} RegExp to test with
 * @return {Boolean} True if regex matched the value
 */
function test (value, regex) {
  if (Array.isArray(value)) {
    return (value.find(item => regex.test(item)) !== undefined) 
  } else {
    return regex.test(value)
  }
}
}

export default class JsonSearch {
  constructor (jsonArray, options = {}) {
    this.jsonArray = jsonArray
    this.indice = options.indice || {}
    if (this.jsonArray.length <= 0) return
    if (Object.keys(this.indice).length > 0) return
    this.setKeys(jsonArray[0])
  }

  setKeys (item) {
    for (const o in item) {
      if (typeof item[o] === 'string') this.indice[o] = o
      if (Array.isArray(item[o])) this.indice[o] = o
    }
  }

  filterFunc (query) {
    if (!query) return () => true

    // search index keys
    const searchKeys = Object.keys(this.indice)
    const queryFuncs = filterQueries(query, searchKeys, this.indice)
    return item => {
      let itemMatched = true
      let keyFound

      let negatedKeywordNotFound = true
      // here i have combined two separate for{} blocks for optimization purpose
      // ideally, we should have a for{} block for testing normal search and
      // another for{} block for negated search block (like what we have for indexed search)
      // but I used different variables to do both searches in one for block
      for (const [, objectKey] of Object.entries(this.indice)) {
        const value = item[objectKey]

        if (queryFuncs.textSearchNegate) {
          negatedKeywordNotFound = negatedKeywordNotFound && !test(value, queryFuncs.textSearchNegate)
        }
        if (!negatedKeywordNotFound) return false

        if (queryFuncs.textSearch) {
          keyFound = keyFound || test(value, queryFuncs.textSearch)
        }
      }
      if (keyFound === false) return false

      // find indexed search
      for (const { key, regex } of queryFuncs.keySearch) {
        const value = item[key]
        itemMatched = itemMatched && test(value, regex)
        if (!itemMatched) return false
      }
      // find negated indexed search
      for (const { key, regex } of queryFuncs.keySearchNegate) {
        const value = item[key]
        itemMatched = itemMatched && !test(value, regex)
        if (!itemMatched) return false
      }

      return itemMatched
    }
  }

  /**
   * Search the jsonArray for the query and returns array of found objects
   * @param  {q} query string
   * @return {Array} array of found objects
   */
  query (q) {
    return this.jsonArray.filter(this.filterFunc(q))
  }
}
