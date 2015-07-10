var request = require('supertest')
var server = require('../index.js').server

describe('GET /', function(){
  it('respond with html', function(done){
    request(server)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done)
  })
})

describe('GET /logfile/domainstats.json', function(){
  it('respond with json', function(done){
    request(server)
      .get('/logfile/domainstats.json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
describe('GET /logfile/filestats.json', function(){
  it('respond with json', function(done){
    request(server)
      .get('/logfile/filestats.json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
