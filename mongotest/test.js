var MongoClient = require('mongodb').MongoClient;


module.exports = function (){   
    MongoClient.connect('mongodb://127.0.0.1:27017/mongotest', function(err, client) {
        console.log('Connected to MongoDb!');
        // Using the db connection, save the collection 'testing to a seperate variable

        var collection = client.c('testing');


        // Insert a new item using the collection's insert function
        collection.insert({ 'title': 'Snowcrash' }, function(err, docs){
            // Collection Details
            console.log(docs.length + ' record inserted. ');
            console.log(docs[0].title + ' - ' + docs[0]._id);

        })
        db.close();    
    });

};