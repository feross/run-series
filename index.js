module.exports = function (tasks, cb) {
  var current = 0
  var results = []

  function done (err, result) {
    if (err) {
      cb && cb(err, results)
      cb = null
      return
    }

    results.push(result)
    current += 1

    if (current >= tasks.length) {
      cb && cb(null, results)
      cb = null
    } else {
      tasks[current](done)
    }
  }

  if (tasks.length) {
    tasks[current](done)
  } else {
    cb && cb(null, [])
    cb = null
  }
}
