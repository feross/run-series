/*! run-series. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
module.exports = runSeries

function runSeries(tasks, cb) {
  // First check if passed tasks are of type 'Array'
  if (!Array.isArray(tasks))
    throw TypeError('You need to pass an array of functions..!');

  let current = 0;
  const results = [];
  let isSync = true;

  function done(err) {
    function end() {
      // Always check if provided callback function is callable (is an actual function)
      if (cb instanceof Function) cb(err, results);
    }

    if (isSync) process.nextTick(end);
    else end();
  }

  function excuteTask(task) {
    if (current > tasks.length) return; /** Base case */

    if (task instanceof Function) task(each);
    else
      excuteTask(
        tasks[++current]
      ); /** Recursion till find a callable, or exit if not and reached the end of tasks array */
  }

  function each(err, result) {
    /** Check first if the function returned a result, so that returned array 'result' doesn't has something like [ 1, undefined, 2, 4 ] */
    if (result !== undefined) results.push(result);

    if (current >= tasks.length || err) done(err);
    else excuteTask(tasks[++current]);
  }

  // Always check if current item is a is callable (is an actual function).
  if (tasks.length > 0) excuteTask(tasks[current]);
  else done(null);

  isSync = false;
}
