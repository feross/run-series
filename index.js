module.exports = function (tasks, cb) {
  var current = 0
  var results = []
  cb = cb || function () {}

  function done (err, result) {
    if (err) return cb(err, results)
    results.push(result)

    if (++current >= tasks.length) {
      cb(null, results)
    } else {
      if (typeof tasks[current] == 'function') {
        tasks[current](done)
      } else {
        done(null, tasks[current])
      }
    }
  }

  if (tasks.length) {
    tasks[0](done)
  } else {
    cb(null, [])
  }
}
