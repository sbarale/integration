
var ValidationError = require('../src/errors').ValidationError
var BadRequest = require('../src/errors').BadRequestError
var integration = require('..')
var assert = require('assert')

describe('errors', function () {
  describe('BadRequest', function () {
    it('should expose .stack', function () {
      var err = new BadRequest('error', 'Segment', { status: 400, body: 'body' })
      assert.equal('error', err.message)
      assert.equal('BAD_REQUEST', err.code)
      assert.equal('Segment', err.integration)
      assert.equal(400, err.status)
      assert.equal('body', err.body)
      assert.equal('string', typeof err.stack)
    })

    it('should not error without context', function () {
      new BadRequest('error', 'Segment') // eslint-disable-line
    })
  })

  describe('ValidationError', function () {
    it('should expose .stack', function () {
      var err = new ValidationError('.key is required', 'Segment')
      assert.equal('INVALID_SETTINGS', err.code)
      assert.equal(400, err.status)
      assert.equal('.key is required', err.message)
    })
  })

  describe('.error(msg)', function () {
    it('should return new bad request error', function () {
      var Segment = integration('Segment')
      var err = Segment.error('message')
      assert.equal('BAD_REQUEST', err.code)
      assert.equal('message', err.message)
      assert.equal('Segment', err.integration)
    })
  })

  describe('.error(msg)', function () {
    var Segment = integration('Segment')
    var err = Segment.error('message')
    assert.equal('BAD_REQUEST', err.code)
    assert.equal('message', err.message)
    assert.equal('Segment', err.integration)
  })

  describe('.reject(msg)', function () {
    var Segment = integration('Segment')
    var err = Segment.reject('message')
    assert.equal('MESSAGE_REJECTED', err.code)
    assert.equal('message', err.message)
    assert.equal('Segment', err.integration)
    assert.equal(400, err.status)
  })

  describe('.invalid(msg)', function () {
    it('should return invalid settings error', function () {
      var Segment = integration('Segment')
      Segment.invalid('error')
    })
  })
})
