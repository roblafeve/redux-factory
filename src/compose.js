var R = require('ramda')
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
  var factories         = composeV(R.reverse)(args.slice(0, -1))
  var getInitState      = function(x) { return x(undefined, {type: null}) }
  var applyPrefix       = function(x) { return x(prefix) }
  var prefixedFactories = R.map(applyPrefix, factories)
  var reducers          = R.map(function(x) { return x.reducer }, prefixedFactories)
  var initState         = composeV(R.mergeAll, R.reverse, R.map(getInitState))(reducers)
  var composedReducer   = { reducer: function(state, action) {
    return composeV.apply(null, reducers)(state || initState, action) }
  }
  return R.mergeAll(R.concat(prefixedFactories, composedReducer))

}
