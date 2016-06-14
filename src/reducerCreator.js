var R = require('ramda')
var constPrefixedWith = require('./helpers').constPrefixedWith

module.exports = R.curry(function(initialState, actionDefinitions, prefix) {
  var toConst = constPrefixedWith(prefix)
  return function(state, action) {
    return R.cond(
      R.append(
        [R.T, function() { return state || initialState }],
        R.map(function(actionDef) {
          var key = actionDef[0]
          var keyType = toConst(key)
          return [
            function() { return keyType == action.type },
            function() { return R.merge(state, actionDef[1](action.payload, state || initialState)) }
          ]
        },
        R.toPairs(actionDefinitions)))
    )(action)
  }
})
