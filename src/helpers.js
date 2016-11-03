var R = require('ramda')

var methodized = R.curry(function(actionDefs, prefix, name) {
  var obj = {}
  var type = prefix === false ? name : R.concat(prefix + '_', name)
  var meta = actionDefs[name].meta ? actionDefs[name].meta : null
  obj[name] = function(payload) {
    return {
      type: type,
      payload: payload,
      error: payload instanceof Error,
      meta: meta
    }
  }
  return obj
})
exports.methodized = methodized

var methodObject = R.curry(function(prefix, actionDefs) {
  var names = Object.keys(actionDefs)
  return R.compose(R.mergeAll, R.map(methodized(actionDefs, prefix)))(names)
})
exports.methodObject = methodObject
