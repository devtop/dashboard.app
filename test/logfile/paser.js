var parser = require('../../lib/logfile/parser.js')
var chai = require('chai')
var expect = chai.expect

describe('Parser ', function(){
  describe('hosts ', function(){

    it('provides an valid Object', function(done){
      parser.hosts(function(hosts){
        Object.keys(hosts)
        done()
      })
    })

    it('has at least one element', function(done){
      parser.hosts(function(hosts){
        var element = hosts[Object.keys(hosts)[0]]
        expect(element).not.to.be.undefined
        done()
      })
    })
  })
  describe('files ', function(){

    it('provides an valid Object', function(done){
      parser.files(function(files){
        Object.keys(files)
        done()
      })
    })

    it('has at least one element', function(done){
      parser.files(function(files){
        var element = files[Object.keys(files)[0]]
        expect(element).not.to.be.undefined
        done()
      })
    })
  })
})
