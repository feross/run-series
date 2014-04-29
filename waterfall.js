module.exports = function (tasks, cb) {
  var current = 0
  cb = cb || function () {}

  function done (err) {
    var args = Array.prototype.slice.call(arguments, 1)
    if (err) return cb(err, args)

    if (++current >= tasks.length) {
      cb.apply(undefined, [null].concat(args))
    } else {
      tasks[current].apply(undefined, args.concat(done))
    }
  }

  if (tasks.length) {
    tasks[0](done)
  } else {
    cb(null, [])
  }
}
