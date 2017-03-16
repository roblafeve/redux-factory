var append  = require('ramda/src/append')
var curry   = require('ramda/src/curry')
var concat  = require('ramda/src/concat')
var cond    = require('ramda/src/cond')
var map     = require('ramda/src/map')
var T       = require('ramda/src/T')
var toPairs = require('ramda/src/toPairs')

module.exports = curry(function(initialState, transforms, prefix) {
  return function(state, action) {
    return cond(
      append(
        [T, function() { return state || initialState }],
        map(function(transform) {
          var transformKey = transform[0]
          var transformVal = transform[1]
          var computedTransform = typeof transformVal == 'function'
            ? transformVal
            : transformVal.transform
          var keyType = (transformVal.prefix === false || prefix === false)
            ? transformKey
            : concat(prefix + '_', transformKey)
          return [
            function() { return keyType == action.type },
            function() { return computedTransform(state || initialState, action.payload, 2) }
          ]
        },
        toPairs(transforms)))
    )(action)
  }
})
