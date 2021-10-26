/**
 * JsonSearch - https://www.npmjs.com/package/search-array
 * @license
 */
import tokenizeQuery from './QueryTokenizer.js'

function RegExpEscape (string) {
  return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function filterQueries (query, keys) {
  const tokens = tokenizeQuery(query, keys)

  const containsTextRegex = tokens.filter(token => token.key === undefined && !token.isNegate).map(token => RegExpEscape(token.q)).join('|')
  const notcontainsTextRegex = tokens.filter(token => token.key === undefined && token.isNegate).map(token => RegExpEscape(token.q)).join('|')
  const containsKeyRegexs = tokens.filter(token => token.key !== undefined && !token.isNegate).map(token => { return { key: token.key, regex: new RegExp(RegExpEscape(token.q), 'i') } })
  const notContainsKeyRegexs = tokens.filter(token => token.key !== undefined && token.isNegate).map(token => { return { key: token.key, regex: new RegExp(RegExpEscape(token.q), 'i') } })

  return {
    textSearch: containsTextRegex ? new RegExp(containsTextRegex, 'i') : undefined,
    textSearchNegate: notcontainsTextRegex ? new RegExp(notcontainsTextRegex, 'i') : undefined,
    keySearch: containsKeyRegexs,
    keySearchNegate: notContainsKeyRegexs
  }
}

export default class JsonSearch {
  constructor (jsonArray, options = {}) {
    this.jsonArray = jsonArray
    this.indice = options.indice || {}
    if (this.jsonArray.length <= 0) return
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

    /*
    return obj => {
      const queryRegex = new RegExp(RegExpEscape(query), 'i');
      if (queryRegex.test(obj.name)) return true;
      if (queryRegex.test(obj.desc)) return true;
      if (obj.tags.find(tag => queryRegex.test(tag)) !== undefined) return true;
      return false;
    };
    */

    const queryFuncs = filterQueries(query, Object.values(this.indice))
    return item => {
      let itemMatched = true
      let keyFound

      let negatedKeywordNotFound = true
      for (const key in this.indice) {
        const value = item[key]

        if (queryFuncs.textSearchNegate) {
          negatedKeywordNotFound = negatedKeywordNotFound && !queryFuncs.textSearchNegate.test(value)
        }
        if (!negatedKeywordNotFound) return false

        if (queryFuncs.textSearch) {
          keyFound = keyFound || queryFuncs.textSearch.test(value)
        }
      }
      if (keyFound === false) return false

      // find indexed search
      for (const { key, regex } of queryFuncs.keySearch) {
        const value = item[key]
        itemMatched = itemMatched && regex.test(value)
        if (!itemMatched) return false
      }
      // find negated indexed search
      for (const { key, regex } of queryFuncs.keySearchNegate) {
        const value = item[key]
        itemMatched = itemMatched && !regex.test(value)
        if (!itemMatched) return false
      }

      return itemMatched
    }
  }

  query (q) {
    return this.jsonArray.filter(this.filterFunc(q))
  }
}
