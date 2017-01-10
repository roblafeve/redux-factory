var concat   = require('ramda/src/concat')
var map      = require('ramda/src/map')
var reverse  = require('ramda/src/reverse')
var mergeAll = require('ramda/src/mergeAll')
var composeV = require('compose-v')

module.exports = function() {
  var args              = [].slice.call(arguments)
  var prefix            = args.slice(-1)[0]
  if (typeof(prefix) == 'string') {
    return comosed(args, prefix)
  } else {
    return function(prefix) {
      return comosed(args, prefix)
    }
  }
}

function comosed(args, prefix) {
  var factories         = composeV(reverse)(args.slice(0, -1))
  var getInitState      = function(x) { return x(undefined, {type: null}) }
  var applyPrefix       = function(x) { return x(prefix) }
  var prefixedFactories = map(applyPrefix, factories)
  var reducers          = map(function(x) { return x.reducer }, prefixedFactories)
  var initState         = composeV(mergeAll, reverse, map(getInitState))(reducers)
  var composedReducer   = { reducer: function(state, action) {
    return composeV.apply(null, reducers)(state || initState, action) }
  }
  return mergeAll(concat(prefixedFactories, [composedReducer]))

}
