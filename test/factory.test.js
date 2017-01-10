var reducer = require('factory')
var R = require('ramda')

var testReducer = reducer(
  {
    list: [],
    listActive: false,
    name: 'user'
  },
  {
    listAdd: {
      transform: function(x,y) { return R.merge(x, {list: x.list.concat(y)}) },
      prefixed: true,
      meta: {
        schema: 'userSchema'
      }
    },
    nameEdit: function(x,y) { return R.merge(x, {name: y}) }
  },
  'USER'
)

describe('reduxFactory :: (Object, [Object], String) -> Object', function() {
  it('exists', function() { expect(reducer).to.exist })
  it('returns an object', function() {
    var actual = testReducer
    expect(actual).to.be.an('object')
  })
  describe('reducer method:', function() {
    it('handles initial state', function() {
      var actual = testReducer.reducer(null, {type: 'NOT', payload: 'Joe'})
      var wanted = {
        list: [],
        listActive: false,
        name: 'user'
      }
      expect(actual).eql(wanted)
    })
    it('handles action', function() {
      var actual = testReducer.reducer({list: ['Tim']}, testReducer.listAdd('Joe'))
      var wanted = {list: ['Tim', 'Joe']}
      expect(actual).eql(wanted)
    })
    it('handles bad action', function() {
      var actual = testReducer.reducer({list: ['Tim']}, {type: 'NOT', payload: 'Joe'})
      var wanted = {list: ['Tim']}
      expect(actual).eql(wanted)
    })
    it('can take any form of state (Array, Object, String)', function() {
      var plainArray = reducer([], { add:  function(x,y) { return [].concat(x, y) } }, 'array')
      var plainString = reducer('init', { add:  function(x,y) { return y } }, 'string')
      expect(plainArray.reducer(undefined, plainArray.add('hi'))).eql(['hi'])
      expect(plainArray.reducer(undefined, {type: 'NONE', payload: ''})).eql([])
      expect(plainString.reducer(undefined, plainString.add('hi'))).eql('hi')
      expect(plainString.reducer(undefined, {type: 'NONE', payload: ''})).eql('init')
    })
  })

})
