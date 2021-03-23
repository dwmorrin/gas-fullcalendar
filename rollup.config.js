const nodeResolve = require('@rollup/plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')

module.exports = {
  input: 'clientJs/main.js',
  plugins: [
    nodeResolve(),
    postcss({
      config: false, // don't attempt to load a postcss config
      // extract: true
      // ^^^ for writing CSS to a separate file (dist/main.css).
      // in rollup v2, this writes CSS rules in wrong order (https://github.com/egoist/rollup-plugin-postcss/issues/96)
      // so, disable for now, and allow the CSS to be embedded in the JS
    })
  ],
  output: {
    file: 'clientBundles/main.js',
    format: 'iife'
  }
}
