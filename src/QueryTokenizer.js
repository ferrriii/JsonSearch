export default function tokenizeQuery (query, keys) {
  const tokens = []
  /* inspired by https://stackoverflow.com/a/366532/3559463
   * regex named groups:
   *   n: captures negate (symbol - exists or not)
   *   q: captures actual query (exlcuding ' or ")
   *        capture groups 4 and 5 also capture the query
   *   k: captures searched key (in queries like key:something)
   */
  const searchTokenRegex = new RegExp(`(?<n>-)?(?:(?<k>${keys.join('|')}):)?(?<q>"([^"]*)"|'([^']*)'|[^\\s"']+)`, 'ig')

  let token
  while ((token = searchTokenRegex.exec(query)) !== null) {
    const q = token[5] || token[4] || token.groups.q
    const key = token.groups.k
    const isNegate = token.groups.n !== undefined
    tokens.push({ q, key, isNegate })
  }
  return tokens
}
