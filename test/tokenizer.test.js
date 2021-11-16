import tokenizeQuery from '../src/QueryTokenizer.js'
import './jest.extends.js'
import permutate from './permutator.js'

describe('Tokenizer edge cases, queries:', () => {
  it('"a -b"', () => {
    const tokens = tokenizeQuery('"a -b"', ['a', 'b'])
    expect(tokens.length).toBe(1)

    expect(tokens).toContainObject({q:'a -b', key: undefined, isNegate: false})
  })


  it('"a:ss"', () => {
    const tokens = tokenizeQuery('"a:ss"', ['a', 'b'])
    expect(tokens.length).toBe(1)

    expect(tokens).toContainObject({q:'a:ss', key: undefined, isNegate: false})
  })

  it("'a:22 -b:33 -c'", () => {
    const tokens = tokenizeQuery("'a:22 -b:33 -c'", ['a', 'b'])
    expect(tokens.length).toBe(1)

    expect(tokens).toContainObject({q:'a:22 -b:33 -c', key: undefined, isNegate: false})
  })

  it('a:d "a:ss"', () => {
    const tokens = tokenizeQuery('a:d "a:ss"', ['a', 'b'])
    expect(tokens.length).toBe(2)

    expect(tokens).toContainObject({q:'d', key: 'a', isNegate: false})
    expect(tokens).toContainObject({q:'a:ss', key: undefined, isNegate: false})
  })

})

describe('Tokenizer test, queries:', () => {
  const objArray = [
    { a: 'aa', b: 'bb', c: 'c c' },
    { a: 'dd', b: 'ee', c: 'f f' }
  ]

  const queryToTokens = [
    { q: 'aa', token: { q: 'aa', key: undefined, isNegate: false } },
    { q: '-aa', token: { q: 'aa', key: undefined, isNegate: true } },
    { q: '"aa"', token: { q: 'aa', key: undefined, isNegate: false } },
    { q: '"a a"', token: { q: 'a a', key: undefined, isNegate: false } },
    { q: "'b b'", token: { q: 'b b', key: undefined, isNegate: false } },
    { q: '-"b b"', token: { q: 'b b', key: undefined, isNegate: true } },
    { q: "-'a a'", token: { q: 'a a', key: undefined, isNegate: true } },
    { q: 'c:bb', token: { q: 'bb', key: 'c', isNegate: false } },
    { q: '-c:dd', token: { q: 'dd', key: 'c', isNegate: true } },
    { q: 'c:"ee"', token: { q: 'ee', key: 'c', isNegate: false } },
    { q: 'c:"a a"', token: { q: 'a a', key: 'c', isNegate: false } },
    { q: "b:'f f'", token: { q: 'f f', key: 'b', isNegate: false } },
    { q: '-c:"c c"', token: { q: 'c c', key: 'c', isNegate: true } },
    { q: "-c:'e e'", token: { q: 'e e', key: 'c', isNegate: true } }

  ]

  permutate(queryToTokens, 1, 3, arrayOfq => {
    // build the query based on permuation
    const query = arrayOfq.map(q => q.q).join(' ')

    it(query, () => {
      const tokens = tokenizeQuery(query, Object.keys(objArray[0]))
      expect(tokens.length).toBe(arrayOfq.length)

      arrayOfq.forEach(q => expect(tokens).toContainObject(q.token))
    })
  })
})
