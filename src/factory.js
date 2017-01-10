var curry = require('ramda/src/curry')
var merge = require('ramda/src/merge')
var reducerCreator = require('./reducerCreator')
var methodObject = require('./helpers').methodObject

// reduxFactory :: (Object, [Object], String) -> Object
module.exports = curry(function(initialState, actionDefinitions, prefix) {
  return merge(
    methodObject(prefix, actionDefinitions),
    { reducer: reducerCreator(initialState, actionDefinitions, prefix) }
  )
})
