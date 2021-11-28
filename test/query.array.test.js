import Searcher from '../src/JsonSearch.js'
import './jest.extends.js'

describe('Test search in array properties', () => {
  const objArray = [
    { a: 'a1', common: 'bb dd', arr: ['item1', 'item2'] },
    { a: 'a2', common: 'dd', arr: ['item1', 'item3'] },
    { a: 'a3 33', common: 'bb cc item5', arr: ['item4'] }
  ]
  const searcher = new Searcher(objArray)

  it('item1', () => {
    const results = searcher.query('item1')
    expect(results.length).toBe(2)

    expect(results).toContainObject(objArray[0])
    expect(results).toContainObject(objArray[1])
  })

  it('item2', () => {
    const results = searcher.query('item2')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[0])
  })

  it('item3', () => {
    const results = searcher.query('item3')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[1])
  })

  it('arr:item4', () => {
    const results = searcher.query('arr:item4')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[2])
  })

  it('a1 item1', () => {
    const results = searcher.query('a1 item1')
    expect(results.length).toBe(2)

    expect(results).toContainObject(objArray[0])
    expect(results).toContainObject(objArray[1])
  })

  it('a:a1 item1', () => {
    const results = searcher.query('a:a1 item1')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[0])
  })

  it('arr:item1 dd', () => {
    const results = searcher.query('arr:item1 dd')
    expect(results.length).toBe(2)

    expect(results).toContainObject(objArray[0])
    expect(results).toContainObject(objArray[1])
  })

  it('-item1 bb', () => {
    const results = searcher.query('-item1 bb')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[2])
  })

  it('-item3 dd', () => {
    const results = searcher.query('-item3 dd')
    expect(results.length).toBe(1)

    expect(results).toContainObject(objArray[0])
  })

  it('arr:item5', () => {
    const results = searcher.query('arr:item5')
    expect(results.length).toBe(0)
  })

  it('item5', () => {
    const results = searcher.query('item5')
    expect(results.length).toBe(1)
    expect(results).toContainObject(objArray[2])
  })

  it('-item6', () => {
    const results = searcher.query('-item6')
    expect(results.length).toBe(3)
    expect(results).toContainObject(objArray[0])
    expect(results).toContainObject(objArray[1])
    expect(results).toContainObject(objArray[2])
  })
})
