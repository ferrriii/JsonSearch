import Searcher from '../dist/esm/min/JsonSearch.js'

function benchmark (count) {
  const objArray = []
  const values = 'abcdefghijklmnop'.split('')
  for (let i = 0; i < count; i++) {
    const obj = {
      a: values[Math.floor(Math.random() * values.length)],
      b: values[Math.floor(Math.random() * values.length)],
      c: values[Math.floor(Math.random() * values.length)],
      d: [values[Math.floor(Math.random() * values.length)]]
    }
    objArray.push(obj)
  }
  const maxIteration = Math.floor(objArray.length / 8)

  let queryCount = 0
  const searcher = new Searcher(objArray)
  const startTime = Date.now()
  // simple query
  for (let i = 0; i < maxIteration; i++) {
    searcher.query(values[Math.floor(Math.random() * values.length)])
    queryCount++
  }
  // query with key
  for (let i = 0; i < maxIteration; i++) {
    const k = values[Math.floor(Math.random() * values.length)]
    const q = values[Math.floor(Math.random() * values.length)]
    searcher.query(`${k}:${q}`)
    queryCount++
  }
  // query exact match
  for (let i = 0; i < maxIteration; i++) {
    const q = values[Math.floor(Math.random() * values.length)]
    searcher.query(`"${q}"`)
    queryCount++
  }

  // simple query (negated)
  for (let i = 0; i < maxIteration; i++) {
    const q = values[Math.floor(Math.random() * values.length)]
    searcher.query(`-${q}`)
    queryCount++
  }
  // query with key (negated)
  for (let i = 0; i < maxIteration; i++) {
    const k = values[Math.floor(Math.random() * values.length)]
    const q = values[Math.floor(Math.random() * values.length)]
    searcher.query(`-${k}:${q}`)
    queryCount++
  }
  // query exact match (negated)
  for (let i = 0; i < maxIteration; i++) {
    const q = values[Math.floor(Math.random() * values.length)]
    searcher.query(`-'${q}'`)
    queryCount++
  }

  // complex query
  for (let i = 0; i < maxIteration; i++) {
    const k = values[Math.floor(Math.random() * values.length)]
    const q1 = values[Math.floor(Math.random() * values.length)]
    const q2 = values[Math.floor(Math.random() * values.length)]
    const q3 = values[Math.floor(Math.random() * values.length)]
    const q4 = values[Math.floor(Math.random() * values.length)]
    searcher.query(`${q1} "${q2}" ${k}:${q3} -${q4}`)
    queryCount++
  }
  return { duration: (Date.now() - startTime), queryCount }
}

describe('Test simple object with different queries', () => {
  it('query time', () => {
    const benchmarkResults100 = benchmark(1000)
    const benchmarkResults300 = benchmark(3000)

    const ops100 = benchmarkResults100.queryCount * 1000 / benchmarkResults100.duration
    const ops300 = benchmarkResults300.queryCount * 1000 / benchmarkResults300.duration

    console.log(`${benchmarkResults100.queryCount} queries took ${benchmarkResults100.duration}ms; TPS:${ops100}`)
    console.log(`${benchmarkResults300.queryCount} queries took ${benchmarkResults300.duration}ms; TPS:${ops300}`)
  })
})
