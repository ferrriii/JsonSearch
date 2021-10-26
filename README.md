# JsonSearch
<img alt="downloads" src="https://img.shields.io/npm/dt/search-array?style=flat-square"> <img alt="version" src="https://img.shields.io/npm/v/search-array?style=flat-square"> <img alt="issues" src="https://img.shields.io/github/issues/ferrriii/JsonSearch?style=flat-square"> <img alt="package size" src="https://img.shields.io/bundlephobia/minzip/search-array?style=flat-square"> <img alt="forks" src="https://img.shields.io/github/forks/ferrriii/JsonSearch?style=flat-square"> <img alt="stars" src="https://img.shields.io/github/stars/ferrriii/JsonSearch?style=flat-square"> <img alt="license" src="https://img.shields.io/github/license/ferrriii/JsonSearch?style=flat-square"> <img alt="programming language" src="https://img.shields.io/github/languages/top/ferrriii/JsonSearch?style=flat-square"> <img alt="test status" src="https://img.shields.io/github/workflow/status/ferrriii/JsonSearch/test?label=test&style=flat-square">

Easy and lightweight search library for finding items inside an array of objects

## Query options

You can use any of the below formats to quey items inside arrays. A combination of these items is also possible.

- `[keyword]`: any keyword like `test`, `free text search`
- `"[keyword]"`: exact match. It preserves white spaces. example `Back End`
- `-[keyword]`: not containing text. it will return items which don't have the keyword
  - you can use exact match syntax as well like, `-"Query with space"`
- `[key]:[keyword]`: returns items that have the `[keyword]` in the `[key]` property of the object. example, `name:bob`
  - you can use exact match or not containing query like, `name:"Bob Rich"` or, `-name:bob` (name should not contain `bob`)

## Usage

### Node

Installation:
```
npm i search-array
```

Usage:
```JavaScript
const JsonSearch = require('search-array').default

const objectArray = [
  {id:1, title: 'Good book', author: 'Jim', color: 'red'},
  {id:2, title: 'Interesting Movie', author: 'Bob', color: 'dark red'},
  {id:3, title: 'Good Series', author: 'Alex', color: 'dark blue'}
]

const searcher = new JsonSearch(objectArray)
let foundObjects = searcher.query('good')
console.log(foundObjects) // prints item 1 and 2

foundObjects = searcher.query('good -red')
console.log(foundObjects) // prints item 2

foundObjects = searcher.query('good -color:"dark blue"')
console.log(foundObjects) // prints item 1
```

### Browser
```
<script src="https://unpkg.com/search-array"></script>

<script>
// the JsonSearch class is available here
</script>
```

### NPM
Installation:
```
npm i search-array
```

```JavaScript
import JsonSearch from 'search-array'

...
```