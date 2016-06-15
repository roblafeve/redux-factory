var helpers = require('helpers')

describe('helpers:', function() {

  describe('camelCased()',    function() {
    it('handles dashes',      function() { expect(helpers.camelCased('rob-iS')).to.equal('robIs') })
    it('handles underscores', function() { expect(helpers.camelCased('rob_is')).to.equal('robIs') })
    it('handles spaces',      function() { expect(helpers.camelCased('ROB iS')).to.equal('robIs') })
    it('handles camelCase',   function() { expect(helpers.camelCased('robIsDaBomB')).to.equal('robIsDaBomb') })
    it('handles uppercase',   function() { expect(helpers.camelCased('ROB_IS_WHAT')).to.equal('robIsWhat') })
  })

  describe('underscored()', function() {
    it('handles dashes',    function() { expect(helpers.underscored('rob-is')).to.equal('rob_is') })
    it('handles spaces',    function() { expect(helpers.underscored('rob is')).to.equal('rob_is') })
  })

  describe('prefixedWith()', function() {
    it('prepends <a>_ to b', function() {
      var actual = helpers.prefixedWith('USER')
      var wanted = 'USER_HOME'
      expect(actual('HOME')).to.equal(wanted)
    })
    it('returns b if a is false', function() {
      var actual = helpers.prefixedWith(false)
      var wanted = 'HOME'
      expect(actual('HOME')).to.equal(wanted)
    })
  })

  describe('methodized()', function() {
    it('exists', function() { expect(helpers.methodized).to.exist })
    it('returns actionCreator method', function() {
      var actual = helpers.methodized('user', 'test').test('tim')
      var wanted = {type: 'USER_TEST', payload: 'tim'}
      expect(actual).eql(wanted)
    })
  })

  describe('constPrefixedWith()', function() {
    it('exists', function() { expect(helpers.constPrefixedWith).to.exist })
    it('returns prefixed `constant`', function() {
      var actual = helpers.constPrefixedWith('user')('test')
      var wanted = 'USER_TEST'
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
      var actual = helpers.methodObject('user')(['rob', 'tim'])
      var wanted = [ 'rob', 'tim' ]
      expect(actual).have.keys(wanted)
    })
  })

})
