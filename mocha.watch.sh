find -name *.js | grep -v "./node_modules/" | entr ./node_modules/.bin/mocha
