var request = require('supertest')
var server = require('../index.js').server

describe('GET /', function(){
  it('respond with html', function(done){
    request(server)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  })
})
