var fs = require('fs');
var http = require('http');
var mime = require('mime-types');

var port = process.env.PORT || 5001;
http.createServer(function (request, response) {
  let contentType = 'text/plain';
  let data;
  let path = request.url;

  if (path === '/') {
    // if (request.method === "GET") {
    file = 'index.html';
  }
  if (request.method === 'POST' && path === '/scores') {
    response.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    console.log('did a post')
    let theBody = '';
    request.on('data', chunk => {
    
        theBody += '{"' + chunk + '"}'
        theNewerBody = theBody.replace(/&/g, '","')
        theNewestBody = theNewerBody.replace(/%2F/g, '/')
        theNewestestBody = theNewestBody.replace(/=/g,'":"')
        parsedBody = JSON.parse(theNewestestBody)
        // .toString(); 
        // convert Buffer to string

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
           
            const db = client.db(dbName);
           
            insertDocuments(db, function() {
              client.close();
            });
          });
    });
    request.on('end', () => {
        console.log(parsedBody);
        console.log(response.headers)
        response.end('ok');
    });
}

    // MongoClient.connect(url, function(err, client) {
    //     assert.equal(null, err);
    //     console.log("Connected successfully to server");
       
    //     const db = client.db(dbName);
       
    //     insertDocuments(db, function() {
    //       client.close();
    //     });
    //   });;
  
  else if (path.indexOf('.') === -1) {
    file = 'index.html';
  }

  else {
    file = '.' + decodeURIComponent(request.url);
  }

  try {
    if (file) {
      console.log('Serving ' + file);
      data = fs.readFileSync(file);
      contentType = mime.lookup(file);
    }
  } catch (error) {
    console.log(error);

    data = "Error: " + error.toString();
    response.statusCode = 404;
  }

  response.setHeader('Content-Type', contentType + '; charset=utf-8');
  response.write(data);
  response.end();

}).listen(port);

console.log("Listening on port " + port);

//MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO

let testObject = {name: "snoopy", score: "5", message: "bow wow"}

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('scoreboard');
    // Insert some documents
    collection.insertMany([
      
        parsedBody
    
    ], function(err, result) {
      console.log("Inserted documents into the collection");
      callback(result);
    });
  }

  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
   
  // Connection URL
  const url = 'mongodb://everyman:everyman1@ds255308.mlab.com:55308/hidenseek';
   
  // Database Name
  const dbName = 'hidenseek';
   
  // Use connect method to connect to the server

//   MongoClient.connect(url, function(err, client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");
   
//     const db = client.db(dbName);
   
//     insertDocuments(db, function() {
//       client.close();
//     });
//   });
    