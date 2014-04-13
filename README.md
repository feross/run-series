# run-series [![travis](https://img.shields.io/travis/feross/run-series.svg)](https://travis-ci.org/feross/run-series) [![npm](https://img.shields.io/npm/v/run-series.svg)](https://npmjs.org/package/run-series) [![gittip](https://img.shields.io/gittip/feross.svg)](https://www.gittip.com/feross/)

### Run an array of functions in series

![series](https://raw.githubusercontent.com/feross/run-series/master/img.png) [![browser support](https://ci.testling.com/feross/run-series.png)](https://ci.testling.com/feross/run-series)

### install

```
npm install run-series
```

### usage

#### series(tasks, [callback])

Run the functions in the `tasks` array in series, each one running once the previous
function has completed. If any functions in the series pass an error to its callback, no
more functions are run, and `callback` is immediately called with the value of the error.
Otherwise, `callback` receives an array of results when `tasks` have completed.

##### arguments

- `tasks` - An array containing functions to run, each function is passed a
`callback(err, result)` which it must call on completion with an error `err` (which can
be `null`) and an optional result value.
- `callback(err, results)` - An optional callback to run once all the functions have
completed. This function gets a results array containing all the result arguments passed
to the task callbacks.

##### example

```js
var series = require('run-series')

series([
  function (callback) {
    // do some stuff ...
    callback(null, 'one')
  },
  function (callback) {
    // do some stuff ...
    callback(null, 'two')
  }
],
// optional callback
function (err, results) {
  // the results array will equal ['one','two']
})
```

#### waterfall(tasks, [callback])

Runs the `tasks` array of functions in series, each passing their results to the next in
the array. However, if any of the `tasks` pass an error to their own callback, the next
function is not executed, and the main `callback` is immediately called with the error.

##### arguments

- `tasks` - An array of functions to run, each function is passed a
`callback(err, result1, result2, ...)` it must call on completion. The first argument is
an error (which can be `null`) and any further arguments will be passed as arguments in
order to the next task.
- `callback(err, [results])` - An optional callback to run once all the functions have
completed. This will be passed the results of the last task's callback.

##### example

```js
var series = require('run-series')

series.waterfall([
  function (callback) {
    callback(null, 'one', 'two')
  },
  function (arg1, arg2, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    callback(null, 'three')
  },
  function (arg1, callback) {
    // arg1 now equals 'three'
    callback(null, 'done', 'wohoo')
  }
], function (err, result1, result2) {
   // result1 now equals 'done'
   // result2 now equals 'wohoo'
})
```

This module is basically equavalent to
[`async.series`](https://github.com/caolan/async#seriestasks-callback) and
[`async.waterfall`](https://github.com/caolan/async#waterfalltasks-callback), but it's
handy to just have the functions you need instead of the kitchen sink. Modularity!
Especially handy if you're serving to the browser and need to reduce your javascript
bundle size.

Works great in the browser with [browserify](http://browserify.org/)!

## license

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).
