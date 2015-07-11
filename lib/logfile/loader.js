(function(exports) {
  var http = require('http')
  var fs = require('fs')
  var Promise = require('promise')

  var target = '/tmp/varnish.log'
  var source = "http://tech.vg.no/intervjuoppgave/varnish.log"

  var done = exports.done = false

  function needRefresh() {
    if (!fs.existsSync(target)) {
      return true
    }
    return false
  }

  function setAsDone() {
    done = true
  }

  function refresh(callDone) {
      if (needRefresh()) {
        var file = fs.createWriteStream(target)
        console.log('trying to refresh varnish.log')
        var request = http.get(source, function(response) {
          response.pipe(file)
          setAsDone()
          callDone()
        });
      }
      else {
        setAsDone()
        callDone()
      }
  }
  exports.refresh = refresh

})(this)
