module.exports = function (tasks, cb) {
  var current = 0
  var results = []
  var isSync = true

  function done (err, results) {
    function end () {
      if (cb) cb(err, results)
    }
    if (isSync) process.nextTick(end)
    else end()
  }

  function each (err, result) {
    results.push(result)
    if (++current >= tasks.length || err) done(err, results)
    else tasks[current](each)
  }

  if (tasks.length > 0) tasks[0](each)
  else done(null, results)

  isSync = false
}
