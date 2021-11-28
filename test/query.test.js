import Searcher from '../src/JsonSearch.js'
import './jest.extends.js'

describe('Test simple object with different queries', () => {
  const objArray = [
    { a: 'aa', b: 'bb', c: 'c c', d: ['item1', 'item2'] },
    { a: 'dd', b: 'ee', c: 'f f', d: ['item1', 'item3'] },
    { a: 'gg c', b: 'hh', c: 'bb ee f f d d', d: ['item4'] }
  ]
  const searcher = new Searcher(objArray)

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

  it('b:ee', () => {
    const results = searcher.query('b:ee')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[1])
  })

  it('c:"f f"', () => {
    const results = searcher.query('c:"f f"')
    expect(results.length).toBe(2)

    expect(results).toContainObject(objArray[1])
    expect(results).toContainObject(objArray[2])
  })

  it('"d d"', () => {
    const results = searcher.query('"d d"')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[2])
  })

  it('bb -hh', () => {
    const results = searcher.query('bb -hh')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[0])
  })

  it('bb -c:"c c"', () => {
    const results = searcher.query('bb -c:"c c"')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[2])
  })

  it('bb -b:bb', () => {
    const results = searcher.query('bb -b:bb')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[2])
  })

  it('d', () => {
    const results = searcher.query('d')
    expect(results.length).toBe(2)

    expect(results).toContainObject(objArray[1])
    expect(results).toContainObject(objArray[2])
  })

  it('d -"d d"', () => {
    const results = searcher.query('d -"d d"')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[1])
  })

  it('f f', () => {
    const results = searcher.query('f f')
    expect(results.length).toBe(2)

    expect(results).toContainObject(objArray[1])
    expect(results).toContainObject(objArray[2])
  })

  it("'f f'", () => {
    const results = searcher.query("'f f'")
    expect(results.length).toBe(2)

    expect(results).toContainObject(objArray[1])
    expect(results).toContainObject(objArray[2])
  })

  it('f f b:hh', () => {
    const results = searcher.query('f f b:hh')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[2])
  })

  it('a:gg f f b:hh', () => {
    const results = searcher.query('a:gg f f b:hh')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[2])
  })

  it('a:gg "f f" b:hh', () => {
    const results = searcher.query('a:gg "f f" b:hh')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[2])
  })

  it('a:gg "f f" b:hh c:d', () => {
    const results = searcher.query('a:gg "f f" b:hh c:d')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[2])
  })

  it('a:gg "f f" b:hh c:d -a:"aa"', () => {
    const results = searcher.query('a:gg "f f" b:hh c:d -a:"aa"')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[2])
  })

  it('d d', () => {
    const results = searcher.query('d d')
    expect(results.length).toBe(2)

    expect(results).toContainObject(objArray[1])
    expect(results).toContainObject(objArray[2])
  })
  // queries with no results

  it('zz', () => {
    const results = searcher.query('z')
    expect(results.length).toBe(0)
  })

  it('"h h"', () => {
    const results = searcher.query('"h h"')
    expect(results.length).toBe(0)
  })

  it('dd b:bb', () => {
    const results = searcher.query('dd b:bb')
    expect(results.length).toBe(0)
  })

  it('ee -d', () => {
    const results = searcher.query('ee -d')
    expect(results.length).toBe(0)
  })

  it('dd -"f f"', () => {
    const results = searcher.query('dd -"f f"')
    expect(results.length).toBe(0)
  })

  it('a:gg "f f" b:hh c:d -c', () => {
    const results = searcher.query('a:gg "f f" b:hh c:d')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[2])
  })
})
