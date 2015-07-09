var http = require('http')
var fs = require('fs')

var file = fs.createWriteStream("/tmp/varnish.log")
var request = http.get("http://tech.vg.no/intervjuoppgave/varnish.log", function(response) {
  response.pipe(file)
  
})
