import Searcher from '../src/JsonSearch.js'

function benchmark (count) {
  const objArray = []
  const values = 'abcdefghijklmnop'.split('')
  for (let i = 0; i < count; i++) {
    const obj = {
      a: values[Math.floor(Math.random() * values.length)],
      b: values[Math.floor(Math.random() * values.length)],
      c: values[Math.floor(Math.random() * values.length)]
    }
    objArray.push(obj)
  }
  const maxIteration = Math.floor(objArray.length / 8)

  const searcher = new Searcher(objArray)
  const startTime = Date.now()
  // simple query
  for (let i = 0; i < maxIteration; i++) {
    searcher.query(values[Math.floor(Math.random() * values.length)])
  }
  // query with key
  for (let i = 0; i < maxIteration; i++) {
    const k = values[Math.floor(Math.random() * values.length)]
    const q = values[Math.floor(Math.random() * values.length)]
    searcher.query(`${k}:${q}`)
  }
  // query exact match
  for (let i = 0; i < maxIteration; i++) {
    const q = values[Math.floor(Math.random() * values.length)]
    searcher.query(`"${q}"`)
  }

  // simple query (negated)
  for (let i = 0; i < maxIteration; i++) {
    const q = values[Math.floor(Math.random() * values.length)]
    searcher.query(`-${q}`)
  }
  // query with key (negated)
  for (let i = 0; i < maxIteration; i++) {
    const k = values[Math.floor(Math.random() * values.length)]
    const q = values[Math.floor(Math.random() * values.length)]
    searcher.query(`-${k}:${q}`)
  }
  // query exact match (negated)
  for (let i = 0; i < maxIteration; i++) {
    const q = values[Math.floor(Math.random() * values.length)]
    searcher.query(`-'${q}'`)
  }

  // complex query
  for (let i = 0; i < maxIteration; i++) {
    const k = values[Math.floor(Math.random() * values.length)]
    const q1 = values[Math.floor(Math.random() * values.length)]
    const q2 = values[Math.floor(Math.random() * values.length)]
    const q3 = values[Math.floor(Math.random() * values.length)]
    const q4 = values[Math.floor(Math.random() * values.length)]
    searcher.query(`${q1} "${q2}" ${k}:${q3} -${q4}`)
  }
  const avgQueryExecutionTime = (Date.now() - startTime) / (maxIteration * 7) // 7 for 7 for() blocks
  console.log(`Average Query Time in an array of ${count} items`, avgQueryExecutionTime)
  return avgQueryExecutionTime
}

describe('Test simple object with different queries', () => {
  it('should run less than 10ms', () => {
    expect(benchmark(1000)).toBeLessThan(2)
    expect(benchmark(10000)).toBeLessThan(10)
  })
})
