var models = require('../../models'),
    async = require('async');


module.exports = {
    newest: function(callback){
        models.Comment.find({}, {}, { limit: 5 , sort: { 'timestamp': '-1' }},
            function(err, comments ){
                var attachImage = function(comment, next){
                    models.Image.findOne({ _id: comment.image_id }, function(err, image){
                        if(err) throw err;

                        comment.image = image;
                        next(err);
                    });
                };
                
                var allComments = comments.map(function(comm){ return comm.toObject(); });                
                async.each(allComments, attachImage, function(err){
                    if(err) throw err;
                    callback(err, allComments);
                })
        });
    }
}