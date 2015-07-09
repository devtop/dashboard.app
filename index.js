(function (exports){
  var express = require('express')
  var server = exports.server = express()

  server.use(express.static( __dirname + "/public"))


  server.listen(3005)
})(this)
