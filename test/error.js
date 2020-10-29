const series = require('../')
const test = require('tape')

test('functions that return errors', function (t) {
  t.plan(2)

  const tasks = [
    function (cb) {
      t.pass('cb 1')
      cb(new Error('oops'))
    },
    function (cb) {
      setTimeout(function () {
        t.fail('should not execute')
        cb(null, 2)
      }, 100)
    }
  ]

  series(tasks, function (err) {
    t.ok(err instanceof Error)
  })
})
