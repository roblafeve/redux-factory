var R = require('ramda')

var prefixedWith = R.curry(function(prefix, x) { return  prefix ? prefix + '_' + x : x })
exports.prefixedWith = prefixedWith

var underscored  = function(x) {
  return x.replace(/([a-z](?=[A-Z]))([A-Z])/g, '$1_$2')
          .replace(/(\s|-)/, '_')
}
exports.underscored = underscored

var camelCased  = function(x) {
  return x.replace(/([A-Z]+[A-Z])|(.$)|(.)[-_\s]/g, R.toLower)
          .replace(/[-_\s]+(.)/g,                   R.toUpper)
          .replace(/(\s|\-|_)/g, '')
}
exports.camelCased = camelCased

var methodized = function(name) {
  var obj = {}
  obj[name] = function(x) { return { type: R.compose(R.toUpper,underscored)(name), payload: x } }
  return obj
}
exports.methodized = methodized

var constPrefixedWith = function(x) {
  return R.compose(R.toUpper, underscored, prefixedWith(x))
}
exports.constPrefixedWith = constPrefixedWith

var methodObject = R.curry(function(prefix, names) {
  return R.compose(R.mergeAll, R.map(R.compose(methodized, camelCased, constPrefixedWith(prefix))))(names)
})
exports.methodObject = methodObject
