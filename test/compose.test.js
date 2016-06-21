var factory = require('factory')
var compose = require('compose')
var R = require('ramda')

var list = factory(
  { list: [], name: 'Rob' },
  {
    add:        function(x, y) { return R.merge(x, {list: x.list.concat(y)}) },
    changeName: function(x, y) { return R.merge(x, {name: 'Your name is ' + y}) }
  }
)

var other = factory(
  { name: '' },
  {
    changeName: function(x, y) { return R.merge(x, {name: y}) }
  }
)

var yetAnother = factory(
  { age: 21 },
  {
    setAge: function(x, y) { return R.merge(x, {age: y}) }
  }
)

describe('compose', function() {
  it('returns combined reduxFactories', function() {
    var actual = compose(list, other, 'user')
    var wanted = [
      'add',
      'changeName',
      'reducer'
    ]
    expect(actual).has.keys(wanted)
  })
  it('returns curried function if string prefix is not passed', function() {
    var actual = compose(list, other)('user')
    var wanted = [
      'add',
      'changeName',
      'reducer'
    ]
    expect(actual).has.keys(wanted)
  })
  it('can be nested in another compose', function() {
    var first = compose(list, other)
    var actual = compose(first, yetAnother, 'user')
    var wanted = [
      'add',
      'changeName',
      'reducer',
      'setAge'
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
    var actual = combined.reducer(undefined, combined.changeName('Rob'))
    var wanted = {name: 'Rob', list: []}
    expect(actual).eql(wanted)
  })
  it('handles actions from first factory', function() {
    var combined = compose(list, other, 'user')
    var actual = combined.reducer({list: [], name: ''}, combined.add({name: 'Rob'}))
    var wanted = {list: [{name: 'Rob'}], name: ''}
    expect(actual).eql(wanted)
  })
  it('handles actions from second factory', function() {
    var combined = compose(list, other, 'user')
    var actual = combined.reducer({list: [], name: ''}, combined.changeName('Rob'))
    var wanted = {list: [], name: 'Rob'}
    expect(actual).eql(wanted)
  })
  it('handles actions from third factory', function() {
    var combined = compose(list, other, yetAnother, 'user')
    var actual = combined.reducer({list: [], name: 'Rob'}, combined.setAge(31))
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
