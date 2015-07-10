var parser = require('../../lib/logfile/parser.js')
var chai = require('chai')
var expect = chai.expect

describe('Parser ', function(){
  describe('hosts ', function(){

    it('provides an valid array', function(done){
      parser.hosts(function(hosts){
        expect(hosts).to.be.an.instanceof(Array)
        done()
      })
    })

    it('has at least one element', function(done){
      parser.hosts(function(hosts){
        expect(hosts).to.have.length.above(0)
        done()
      })
    })

    it('provides elements with domain and count key', function(done){
      parser.hosts(function(hosts){
        var element = hosts.pop()
        expect(element).to.have.all.keys('domain', 'count')
        done()
      })
    })

    it('provided domains are descendly order by count', function(done){
      parser.hosts(function(hosts){
        for	(var index = 1; index < hosts.length; index++)
          expect(hosts[index].count).to.be.at.most(hosts[index-1].count)
        done()
      })
    })
  })
  describe('files ', function(){

    it('provides an valid Object', function(done){
      parser.files(function(files){
        expect(files).to.be.an.instanceof(Array)
        done()
      })
    })

    it('has at least one element', function(done){
      parser.files(function(files){
        expect(files).to.have.length.above(0)
        done()
      })
    })
    it('provides elements with file and count key', function(done){
      parser.files(function(files){
        var element = files.pop()
        expect(element).to.have.all.keys('file', 'count')
        done()
      })
    })
    it('provided files are descendly order by count', function(done){
      parser.files(function(files){
        for	(var index = 1; index < files.length; index++)
          expect(files[index].count).to.be.at.most(files[index-1].count)
        done()
      })
    })
  })
})
