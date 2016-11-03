var R = require('ramda')

module.exports = R.curry(function(initialState, actionDefinitions, prefix) {
  return function(state, action) {
    return R.cond(
      R.append(
        [R.T, function() { return state || initialState }],
        R.map(function(actionDef) {
          var defKey = actionDef[0]
          var defVal = actionDef[1]
          var transform = typeof defVal == 'function' ? defVal : defVal.transform
          var keyType = (defVal.prefixed === false || prefix === false) ? defKey : R.concat(prefix + '_', defKey)
          return [
            function() { return keyType == action.type },
            function() { return transform(state || initialState, action.payload) }
          ]
        },
        R.toPairs(actionDefinitions)))
    )(action)
  }
})
