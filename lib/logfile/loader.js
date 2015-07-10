(function(exports) {
  var http = require('http')
  var fs = require('fs')

  function refresh(done) {

    //var file = fs.createWriteStream("/tmp/varnish.log")
    console.log('trying to refresh varnish.log')
    var request = http.get("http://tech.vg.no/intervjuoppgave/varnish.log", function(response) {
    //  response.pipe(file)
      done()
    });
  }
  exports.refresh = refresh
})(this)
