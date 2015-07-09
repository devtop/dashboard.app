(function(exports) {
  var http = require('http')
  var fs = require('fs')

  function refresh() {
    var file = fs.createWriteStream("/tmp/varnish.log")
    console.log('trying to refresh varnish.log')
    var request = http.get("http://tech.vg.no/intervjuoppgave/varnish.log", function(response) {
      response.pipe(file)
    });
  }
  exports.refresh = refresh
})(this)
