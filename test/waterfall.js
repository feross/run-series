var series = require('../')
var waterfall = require('../waterfall')
var test = require('tape')

test('require(run-series/waterfall) usage', function (t) {
  t.equal(waterfall, series.waterfall)
  t.end()
})

test('waterfall: functions pass results to next function', function (t) {
  t.plan(8)

  var tasks = [
    function (cb) {
      t.pass('cb 1')
      cb(null, 1)
    },
    function (result, cb) {
      t.equal(result, 1)
      cb(null, 2, 3, 4)
    },
    function (result1, result2, result3, cb) {
      t.equal(result1, 2)
      t.equal(result2, 3)
      t.equal(result3, 4)
      cb(null, 99, 100)
    }
  ]

  series.waterfall(tasks, function (err, result1, result2) {
    t.error(err)
    t.equal(result1, 99)
    t.equal(result2, 100)
  })
})
