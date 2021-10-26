export default function tokenizeQuery (query, keys) {
  const tokens = []
  // inspired by https://stackoverflow.com/a/366532/3559463
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
