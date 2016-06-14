var reducerCreator = require('reducerCreator')

describe('reducerCreator :: (Object, Array, String) -> (Object, Object) -> Object', function() {

  it('exists',
    function() { expect(reducerCreator).to.exist })

  it('returns function',
    function() {  expect(reducerCreator()).to.be.a('function') })

  it('supplying the first three args returns a redux reducer',
    function() {  expect(reducerCreator({name: ''}, {}, null)).to.be.a('function') })

  it('reducer handles state and action',
    function() {
      var reducer = reducerCreator({name: 'rob'}, { actionType: function(x){ return {name: x} } }, 'prefix')
      var actual = reducer(undefined, {type: 'PREFIX_ACTION_TYPE', payload: 'joe'})
      var wanted = {name: 'joe'}
      expect(actual).eql(wanted)
    })

})
