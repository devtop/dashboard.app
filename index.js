(function (exports){
  var loader = require('./lib/logfile/loader.js')
  loader.refresh(function(){})

  var express = require('express')
  var server = exports.server = express()

  server.use(express.static( __dirname + "/public"))

  server.get('/logfile/highlights.json', function (req, res) {
    console.log('requested logfile/highlights')
    res.json({})
  })

  server.listen(3005)
})(this)
