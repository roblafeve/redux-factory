var R = require('ramda')
var reducerCreator = require('./reducerCreator')
var methodObject = require('./helpers').methodObject

// reduxFactory :: (Object, [Object], String) -> Object
module.exports = R.curry(function(initialState, actionDefinitions, prefix) {
  return R.merge(
    methodObject(prefix, actionDefinitions),
    { reducer: reducerCreator(initialState, actionDefinitions, prefix) }
  )
})
