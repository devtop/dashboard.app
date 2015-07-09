var logfile = require('../../lib/logfile/loader.js')
var fs = require('fs')


describe('Loader ', function(){
  it('loads logfile', function(){
    fs.existsSync('/tmp/varnish.log')
  })
})
