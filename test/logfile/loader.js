var logfile = require('../../lib/logfile/loader.js')
var fs = require('fs')

describe('Loader ', function(){
  it('loads logfile', function(done){
//    fs.unlinkSync('/tmp/varnish.log')
//    logfile.refresh(done)
    fs.existsSync('/tmp/varnish.log')
    done()
  })
})
