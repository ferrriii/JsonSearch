import { babel } from '@rollup/plugin-babel'

const config = {
  input: 'src/JsonSearch.js',
  output: {
    dir: 'dist/lib/',
    format: 'iife',
    name: 'JsonSearch',
    sourcemap: true,
    banner: '/* JsonSearch - https://www.npmjs.com/package/search-array @license */'
  },
  plugins: [babel({
    presets: [
      [
        '@babel/preset-env',
        {
          bugfixes: true,
          targets: '> 0.25%',
          modules: false
        }
      ]
    ]
  })]
}

export default config
