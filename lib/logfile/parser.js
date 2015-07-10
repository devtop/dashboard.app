(function (exports) {

  var lineReader = require('line-reader')
  var hostCounts = {}, fileCounts = {}

  var hostsListeners = [], filesListeners = []
  var finishedCount = false

  function domainFromLine(line) {
    var fields = line.split(/ https?:\/\//)
    return fields[1].split('/')[0]
  }

  function increaseDomainCount(domain) {
    if (hostCounts[domain]) {
      hostCounts[domain] += 1
    }
    else {
      hostCounts[domain] = 1
    }
  }

  function fileFromLine(line) {
    var fields = line.split(/ https?:\/\/[^\/]*/)
    return fields[1].split(/\?| /)[0]
  }

  function increaseFileCount(file) {
    if (fileCounts[file]) {
      fileCounts[file] += 1
    }
    else {
      fileCounts[file] = 1
    }
  }

  // 95.169.38.75 - - [23/May/2012:14:01:05 +0200] "GET http://2.vgc.no/drfront/images/snippets/4f86cbca9a470-rettssak_590.jpg HTTP/1.1" 200 9830 "http://www.vg.no/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/534.51.22 (KHTML, like Gecko) Version/5.1.1 Safari/534.51.22"
  lineReader.eachLine('/tmp/varnish.log', function(line, last) {
    increaseDomainCount(domainFromLine(line))
    increaseFileCount(fileFromLine(line))
    if (last) {
      finishedCount = true
      for	(index = 0; index < hostsListeners.length; index++) {
        hostsListeners[index](hostCounts)
      }
      for	(index = 0; index < filesListeners.length; index++) {
        filesListeners[index](fileCounts)
      }
    }
  });

  function hosts(callback) {
    if (finishedCount) {
      callback(hostCounts)
    }
    else {
      hostsListeners.push(callback)
    }
  }
  exports.hosts = hosts

  function files(callback) {
    if (finishedCount) {
      callback(fileCounts)
    }
    else {
      filesListeners.push(callback)
    }
  }
  exports.files = files
})(this)
