# JsonSearch
<img alt="downloads" src="https://img.shields.io/npm/dt/search-array?style=flat-square"> <img alt="version" src="https://img.shields.io/npm/v/search-array?style=flat-square"> <img alt="issues" src="https://img.shields.io/github/issues/ferrriii/JsonSearch?style=flat-square"> <img alt="package size" src="https://img.shields.io/bundlephobia/minzip/search-array?style=flat-square"> <img alt="forks" src="https://img.shields.io/github/forks/ferrriii/JsonSearch?style=flat-square"> <img alt="stars" src="https://img.shields.io/github/stars/ferrriii/JsonSearch?style=flat-square"> <img alt="license" src="https://img.shields.io/github/license/ferrriii/JsonSearch?style=flat-square"> <img alt="programming language" src="https://img.shields.io/github/languages/top/ferrriii/JsonSearch?style=flat-square"> <img alt="test status" src="https://img.shields.io/github/workflow/status/ferrriii/JsonSearch/test?label=test&style=flat-square">

Easy and lightweight search library for finding items inside an array of objects

## Query options

You can use any of the below syntaxes to quey items inside arrays. A combination of these items is also possible.

- `[keywords]`: Returns items that contain any of the keywords. Example, `test`, `free text search`
- `"[keyword]"`: Returns items that contain the exact keyword. It preserves white spaces. Example, `Back End`
- `-[keyword]`: Items not containing the keyword.
  - You can use exact match syntax as well like, `-"Query with space"`
- `[key]:[keyword]`: Returns items that have the `[keyword]` in the `[key]` property of the object. Example, `name:bob`
  - you can use exact match or not containing query syntaxes as well. Example, `name:"Bob Rich"` or, `-name:bob` (name should not contain `bob`)

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
  {id:1, title: 'Good book', author: 'Jim', colors: 'red'},
  {id:2, title: 'Interesting Movie', author: 'Bob', colors: 'dark red'},
  {id:3, title: 'Good Series', author: 'Alex', colors: 'dark blue'},
  {id:4, title: 'Something', author: 'Feri', colors: ['red', 'blue']}
]

const searcher = new JsonSearch(objectArray)
let foundObjects = searcher.query('good')
console.log(foundObjects) // prints items with id 1 and 3

foundObjects = searcher.query('good -red')
console.log(foundObjects) // prints item 3

foundObjects = searcher.query('good -colors:"dark blue"')
console.log(foundObjects) // prints item 1

foundObjects = searcher.query('red')
console.log(foundObjects) // prints item 1, 2 and 4
```

#### Enale sorting
By default, the ordering of the original array is preserved in the results. But it's possible to sort results based on their match strength, example:
```JavaScript
const searcher = new JsonSearch(objectArray, {
  sort: true
})

```

So, the first item in the `query()` results would be a better match for the query compared to the last item in the results.

#### Defining search indice
By default all object keys of the first item in the objectArray will be used for finding the items in the whole array.
But you can specify search object keys by passing an object of indice as options.
The syntax is as followings:

```JavaScript
const searcher = new JsonSearch(objectArray, {
  indice: {
    'key used in query': 'corresponsding key in the object'
  }
})
```

Example:
```JavaScript
const JsonSearch = require('search-array').default

const objectArray = [
  {id:1, title: 'Good book', author: 'Jim', colors: 'red'},
  {id:2, title: 'Interesting Movie', author: 'Bob', colors: 'dark red'},
  {id:3, title: 'Good Series', author: 'Alex', colors: 'dark blue'},
  {id:4, title: 'Something', author: 'Feri', colors: ['red', 'blue']}
]

const searcher = new JsonSearch(objectArray, {
  indice: {
    'title': 'title', // search the `title`
    'name': 'author' // search the `author` but it's renamed as `name` in queries
  }
})
let foundObjects = searcher.query('good')
console.log(foundObjects) // prints items with id 1 and 3

let foundObjects = searcher.query('name:Jim')
console.log(foundObjects) // prints item with id 1

let foundObjects = searcher.query('author:Jim')
console.log(foundObjects) // finds nothing, the index `author` has not been defined in the options

foundObjects = searcher.query('red')
console.log(foundObjects) // finds nothing because the `red` does not exist in the 'title' or 'author' properties of items
```

### Browser
Use as module:

```html
<script type="module">
  import JsonSearch from 'https://unpkg.com/search-array/dist/esm/min/JsonSearch.js'

  const objectArray = [/*your objects here*/]
  const searcher = new JsonSearch(objectArray)
  let foundObjects = searcher.query('good')
</script>
```

Or, classic:

```html
<script src="https://unpkg.com/search-array"></script>

<script>
  // the JsonSearch class is available here

  const objectArray = [/*your objects here*/]
  const searcher = new JsonSearch(objectArray)
  let foundObjects = searcher.query('good')
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

## TODO

- Add support for nested objects
- Add support for wild card query
- Add options for:
  - Defining case sensivitiy