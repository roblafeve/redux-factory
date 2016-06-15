var reducer = require('factory')

var testReducer = reducer(
  {
    list: [],
    listActive: false,
    name: 'user'
  },
  {
    listAdd: function(x,y) { return {list: y.list.concat(x)} },
    nameEdit: function(x) { return {name: x} }
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
    it('handles bad action action', function() {
      var actual = testReducer.reducer({list: ['Tim']}, {type: 'NOT', payload: 'Joe'})
      var wanted = {list: ['Tim']}
      expect(actual).eql(wanted)
    })
  })
})
