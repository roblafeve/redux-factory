var R = require('ramda')
var reducerCreator = require('./reducerCreator')
var methodObject = require('./helpers').methodObject

// reduxFactory :: (Object, [Object], String) -> Object
module.exports = R.curry(function(initialState, actionDefinitions, prefix) {
  var names = Object.keys(actionDefinitions)
  return R.merge(
    methodObject(prefix, names),
    { reducer: reducerCreator(initialState, actionDefinitions, prefix) }
  )
})
