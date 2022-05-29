import Searcher from '../src/JsonSearch.js'
import './jest.extends.js'

describe('Test specific properties within arrays with sort', () => {
  const objArray = [
    { a: 'aa', b: 'bb', c: 'c c', d: ['item1', 'item2'] },
    { a: 'dd', b: 'ee', c: 'f f', d: ['item1', 'item3'] },
    { a: 'gg c', b: 'hh', c: 'bb ee f f d d', d: ['item4'] }
  ]
  const searcher = new Searcher(objArray, {
    indice: {
      a: 'a',
      d: 'd'
    },
    sort: true
  })

  it('[empty]', () => {
    const results = searcher.query('')
    expect(results.length).toBe(3)

    expect(results).toContainObject(objArray[0])
    expect(results).toContainObject(objArray[1])
    expect(results).toContainObject(objArray[2])
  })

  it('aa', () => {
    const results = searcher.query('aa')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[0])
  })

  it('a:aa', () => {
    const results = searcher.query('a:aa')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[0])
  })

  it('d:item1', () => {
    const results = searcher.query('d:item1')
    expect(results.length).toBe(2)

    expect(results).toContainObject(objArray[0])
    expect(results).toContainObject(objArray[1])
  })

  it('a:aa d:item1', () => {
    const results = searcher.query('a:aa d:item1')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[0])
  })

  it('bb', () => {
    const results = searcher.query('bb')
    expect(results.length).toBe(0)
  })

  it('a:hh', () => {
    const results = searcher.query('a:hh')
    expect(results.length).toBe(0)
  })
})

describe('Test renaming specific properties within arrays', () => {
  const objArray = [
    { a: 'aa', b: 'bb', c: 'c c', d: ['item1', 'item2'] },
    { a: 'dd', b: 'ee', c: 'f f', d: ['item1', 'item3'] },
    { a: 'gg c', b: 'hh', c: 'bb ee f f d d', d: ['item4'] }
  ]
  const searcher = new Searcher(objArray, {
    indice: {
      name: 'a',
      family: 'b'
    },
    sort: true
  })

  it('[empty]', () => {
    const results = searcher.query('')
    expect(results.length).toBe(3)

    expect(results).toContainObject(objArray[0])
    expect(results).toContainObject(objArray[1])
    expect(results).toContainObject(objArray[2])
  })

  it('aa', () => {
    const results = searcher.query('aa')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[0])
  })

  it('name:aa', () => {
    const results = searcher.query('name:aa')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[0])
  })

  it('a:aa', () => {
    const results = searcher.query('a:aa')
    expect(results.length).toBe(0)
  })

  it('b:ee', () => {
    const results = searcher.query('b:ee')
    expect(results.length).toBe(0)
  })

  it('family:ee', () => {
    const results = searcher.query('family:ee')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[1])
  })

  it('c:"f f"', () => {
    const results = searcher.query('c:"f f"')
    expect(results.length).toBe(0)
  })

  it('"d d"', () => {
    const results = searcher.query('"d d"')
    expect(results.length).toBe(0)
  })

  it('bb -hh', () => {
    const results = searcher.query('bb -hh')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[0])
  })

  it('bb -family:bb', () => {
    const results = searcher.query('bb -family:bb')
    expect(results.length).toBe(0)
  })

  it('dd -family:bb', () => {
    const results = searcher.query('dd -family:bb')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[1])
  })

  it("'f f'", () => {
    const results = searcher.query("'f f'")
    expect(results.length).toBe(0)
  })

  it('f f', () => {
    const results = searcher.query('f f')
    expect(results.length).toBe(0)
  })

  it('name:dd family:ee', () => {
    const results = searcher.query('name:dd family:ee')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[1])
  })

  it('name:"gg c"', () => {
    const results = searcher.query('name:"gg c"')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[2])
  })

  it('a:dd b:ee', () => {
    const results = searcher.query('a:dd b:ee')
    expect(results.length).toBe(0)
  })
})
