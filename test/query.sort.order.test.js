import Searcher from '../src/JsonSearch.js'
import './jest.extends.js'

describe('Test Sort', () => {
  const objArray = [
    { id: 1, title: 'keyword1 keyword2 keyword3', description: 'keyword1', tag: 'keyword1' },
    { id: 2, title: 'keyword1 keyword2 keyword3', description: 'keyword2 test', tag: 'keyword2' },
    { id: 3, title: 'keyword1 keyword2 keyword3', description: 'keyword3 test', tag: 'keyword3 test' }
  ]
  const searcher = new Searcher(objArray, { sort: true })

  it('keyword3', () => {
    const results = searcher.query('keyword3')
    expect(results.length).toBe(3)

    expect(results[0].id).toBe(3)
    expect(results[1].id).toBe(1)
    expect(results[2].id).toBe(2)
  })

  it('keyword2 keyword3', () => {
    const results = searcher.query('keyword2 keyword3')
    expect(results.length).toBe(3)

    expect(results[0].id).toBe(2)
    expect(results[1].id).toBe(3)
    expect(results[2].id).toBe(1)
  })

  it('keyword2 keyword3 test', () => {
    const results = searcher.query('keyword2 keyword3 test')
    expect(results.length).toBe(3)

    expect(results[0].id).toBe(3)
    expect(results[1].id).toBe(2)
    expect(results[2].id).toBe(1)
  })

  it('test', () => {
    const results = searcher.query('test')
    expect(results.length).toBe(2)

    expect(results[0].id).toBe(3)
    expect(results[1].id).toBe(2)
  })
})

describe('Test Sort with array property', () => {
  const objArray = [
    { id: 1, title: 'keyword1 keyword2 keyword3', description: 'keyword1', tag: ['keyword1'] },
    { id: 2, title: 'keyword1 keyword2 keyword3', description: 'keyword2 test', tag: ['keyword2'] },
    { id: 3, title: 'keyword1 keyword2 keyword3', description: 'keyword3 test', tag: ['keyword3 test'] }
  ]
  const searcher = new Searcher(objArray, { sort: true })

  it('keyword3', () => {
    const results = searcher.query('keyword3')
    expect(results.length).toBe(3)

    expect(results[0].id).toBe(3)
    expect(results[1].id).toBe(1)
    expect(results[2].id).toBe(2)
  })

  it('keyword2 keyword3', () => {
    const results = searcher.query('keyword2 keyword3')
    expect(results.length).toBe(3)

    expect(results[0].id).toBe(2)
    expect(results[1].id).toBe(3)
    expect(results[2].id).toBe(1)
  })

  it('keyword2 keyword3 test', () => {
    const results = searcher.query('keyword2 keyword3 test')
    expect(results.length).toBe(3)

    expect(results[0].id).toBe(3)
    expect(results[1].id).toBe(2)
    expect(results[2].id).toBe(1)
  })

  it('test', () => {
    const results = searcher.query('test')
    expect(results.length).toBe(2)

    expect(results[0].id).toBe(3)
    expect(results[1].id).toBe(2)
  })
})
