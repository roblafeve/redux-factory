var reduxFactory = require('factory')
var compose = require('factoryCompose')

var list = reduxFactory(
  { list: [], name: 'Rob' },
  {
    add:     function(x, y) { return {list: y.list.concat(x)} },
    changeName: function(x) { return {name: 'Your name is ' + x} }
  }
)

var other = reduxFactory(
  { name: '' },
  {
    changeName: function(x) { return {name: x} }
  }
)

var yetAnother = reduxFactory(
  { age: 21 },
  {
    setAge: function(x) { return {age: x} }  
  }
)

describe('reduxFactoryCompose', function() {
  it('returns combined reduxFactories', function() {
    var actual = compose(list, other, 'user')
    var wanted = [
      'userAdd',
      'userChangeName',
      'reducer'
    ]
    expect(actual).has.keys(wanted)
  })
  it('returns combined initial state from reducer', function() {
    var combined = compose(list, other, 'user')
    var actual = combined.reducer(undefined, {type: 'NOT', payload: {name:  'Rob'}})
    var wanted = {list: [], name: ''}
    expect(actual).eql(wanted)
  })
  it('conflicting keys are merged right to left', function() {
    var combined = compose(list, other, 'user')
    var actual = combined.reducer(undefined, combined.userChangeName('Rob'))
    var wanted = {name: 'Rob', list: []}
    expect(actual).eql(wanted)
  })
  it('handles actions from first factory', function() {
    var combined = compose(list, other, 'user')
    var actual = combined.reducer({list: [], name: ''}, combined.userAdd({name: 'Rob'}))
    var wanted = {list: [{name: 'Rob'}], name: ''}
    expect(actual).eql(wanted)
  })
  it('handles actions from second factory', function() {
    var combined = compose(list, other, 'user')
    var actual = combined.reducer({list: [], name: ''}, combined.userChangeName('Rob'))
    var wanted = {list: [], name: 'Rob'}
    expect(actual).eql(wanted)
  })
  it('handles actions from third factory', function() {
    var combined = compose(list, other, yetAnother, 'user')
    var actual = combined.reducer({list: [], name: 'Rob'}, combined.userSetAge(31))
    var wanted = {list: [], name: 'Rob', age: 31}
    expect(actual).eql(wanted)
  })
  it('handles initial state from three factories (just making sure)', function() {
    var combined = compose(list, other, yetAnother, 'user')
    var actual = combined.reducer(undefined, {type: null})
    var wanted = {list: [], name: '', age: 21}
    expect(actual).eql(wanted)
  })
})
