var curry    = require('ramda/src/curry')
var concat   = require('ramda/src/concat')
var compose  = require('ramda/src/compose')
var map      = require('ramda/src/map')
var mergeAll = require('ramda/src/mergeAll')

var methodized = curry(function(actionDefs, prefix, name) {
  var obj = {}
  var type = prefix === false ? name : concat(prefix + '_', name)
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

var methodObject = curry(function(prefix, actionDefs) {
  var names = Object.keys(actionDefs)
  return compose(mergeAll, map(methodized(actionDefs, prefix)))(names)
})
exports.methodObject = methodObject
