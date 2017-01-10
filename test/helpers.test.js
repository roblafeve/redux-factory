var helpers = require('helpers')

describe('helpers:', function() {

  describe('methodized()', function() {
    it('exists', function() { expect(helpers.methodized).to.exist })
    it('returns actionCreator method', function() {
      var actual = helpers.methodized({testAction: { meta: {schema: 'test'} } }, 'user', 'testAction').testAction('tim')
      var wanted = {type: 'user_testAction', payload: 'tim', error: false, meta: {schema: 'test'}}
      expect(actual).eql(wanted)
    })
    it('handles prefix `false`', function() {
      var actual = helpers.methodized({testAction: () => {} }, false, 'testAction').testAction('tim')
      var wanted = {type: 'testAction', payload: 'tim', error: false, meta: null}
      expect(actual).eql(wanted)
    })
  })

  describe('methodObject()', function() {
    it('exists', function() { expect(helpers.methodObject).to.exist })
    it('returns a function when only prefix provided', function() {
      var actual = helpers.methodObject('user')
      expect(actual).to.be.a('function')
    })
    it('returns object with matching methods', function() {
      var actual = helpers.methodObject('user')({rob: {}, tim: () => {}})
      var wanted = [ 'rob', 'tim' ]
      expect(actual).have.keys(wanted)
    })
  })

})
