docker run -it --rm -v "$PWD":/usr/src/myapp -w /usr/src/myapp \
 -v /tmp:/tmp node node prepare
docker run -it --rm --name "dashboard.app" -p 3005:3005 \
 -v "$PWD":/usr/src/myapp -v /tmp:/tmp -w /usr/src/myapp \
  node node index
#docker run -it --rm -p 3000:3000 -v "$PWD":/usr/src/myapp -w /usr/src/myapp --link=flying_mongo:mongo node
