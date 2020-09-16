var mongoClient = require('mongodb').MongoClient;

module.exports = function (){   
    mongoClient.connect('mongodb://localhost', function(err, client) {
       /*  var db = client.db("mongotest");
        db.collection("testing").find().toArray( 
            function(error, docs){                
                
                 console.log(docs);
                
                client.close();
        }); */
    });

};