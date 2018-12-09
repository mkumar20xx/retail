var express = require('express');
var app = express();
const hostname = '192.168.0.102';
const port = 3000;

app.get('/', function (req, res) {
  res.send('API Running')
});

app.get('/getData', function (req, res) {
  
  var MongoClient = require('mongodb').MongoClient;
  var url = "";
 
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var dbo = client.db("nmdb");
    
    dbo.collection("nmcollection").find({},{ projection: { _id: 0 } }).toArray(function(err, result) {
      if (err) throw err;
      result.forEach(element => {
        console.log(element.name + ' ' + element.address);
      });
      
      client.close();
    });
    
    

  });
 
})

app.get('/insertMany', function (req, response) {
  var MongoClient = require('mongodb').MongoClient;
  var url = "";
  
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var dbo = client.db("nmdb");
    var myobj = [
      { name: 'John', address: 'Highway 71'},
      { name: 'Peter', address: 'Lowstreet 4'},
      { name: 'Amy', address: 'Apple st 652'},
      { name: 'Hannah', address: 'Mountain 21'},
      { name: 'Michael', address: 'Valley 345'},
      { name: 'Sandy', address: 'Ocean blvd 2'},
      { name: 'Betty', address: 'Green Grass 1'},
      { name: 'Richard', address: 'Sky st 331'},
      { name: 'Susan', address: 'One way 98'},
      { name: 'Vicky', address: 'Yellow Garden 2'},
      { name: 'Ben', address: 'Park Lane 38'},
      { name: 'William', address: 'Central st 954'},
      { name: 'Chuck', address: 'Main Road 989'},
      { name: 'Viola', address: 'Sideway 1633'}
    ];
    dbo.collection("nmcollection").insertMany(myobj, function(err, res) {
      if (err) throw err;
      response.write("Number of documents inserted: " + res.insertedCount);
      response.end();
      client.close();
    });
    
  });
})
 
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});