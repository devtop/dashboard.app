docker run -it --rm --name "dashboard.app" -p 3005:3005 \
 -v "$PWD":/usr/src/myapp -w /usr/src/myapp \
  node node index
#docker run -it --rm -p 3000:3000 -v "$PWD":/usr/src/myapp -w /usr/src/myapp --link=flying_mongo:mongo node
