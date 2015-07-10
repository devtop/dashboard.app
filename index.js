(function (exports){
  var loader = require('./lib/logfile/loader.js')
  loader.refresh(function(){})
  var parser = require('./lib/logfile/parser.js')

  var express = require('express')
  var server = exports.server = express()

  server.use(express.static( __dirname + "/public"))

  server.get('/logfile/domainstats.json', function (req, res) {
    console.log('requested logfile/domainstats')

    parser.hosts(function(result){
      res.json(result)
    })
  })

  server.get('/logfile/filestats.json', function (req, res) {
    console.log('requested logfile/domainstats')
    parser.files(function(result) {
      res.json(result)
    })
  })

  server.get('/jsonfeed.json', function (req, res) {
    var request = require('request')
    var url = 'http://rexxars.com/playground/testfeed/'
    req.pipe(request(url)).pipe(res)
  })

  server.listen(3005)
})(this)
