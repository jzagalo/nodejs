var client = require('mongodb').MongoClient,
    params = { author: process.argv[2], quote: process.argv[3] };

client.connect('mongodb://127.0.0.1:27017', function(err, client) {
    
    var db = client.db('admin');
    if(err) throw err;
    var collection = db.collection('quotes');    

    if(params.author && params.quote){
        collection.insertOne({
            author: params.author,
            quote: params.quote,
        }, function(err){
            if(err)  throw err; 
        });

        if(params.author){
            collection.find().toArray(function(err, items){
                console.log(items);
            })

            client.close();
            return;
        }
    }  
  client.close();
});