const { Model } = require('mongoose');
const images = require('./helpers/images');

var fs = require('fs'),
    path = require('path'),
    sidebar = require('./helpers/sidebar'),
    Models = require('../models'),
    viewModel = {
    image: {},
    comments: [],
}; 


module.exports = {
    index: function(req, res) {
        
      Models.Image.findOne({filename: { $regex: req.params.image_id }},
            function(err, image){
                if(err) throw err;
               
                if(image){
                    image.views = image.views + 1;
                    console.log(image);
                    viewModel.image = image.toObject();
                    image.save();

                    Models.Comment.find({ image_id: image._id}, {}, { sort: { timestamp: 1 }},
                        function(err, comments){
                            if(err) { throw err };
                       
                            viewModel.comments = comments;
                            sidebar(viewModel, function(viewModel){
                                res.render('image', viewModel);
                            })
                    });

                }else {
                    res.direct('/');
                }
            }
        );

       
    },
    create: function(req, res) {
        var saveImage = function(){
            var possible =  'abcdefghijklmnopqrstuvwxyz0123456789',
                imgUrl = '';

            for(var i = 0; i < 6; i+=1){
                imgUrl += possible.charAt(Math.floor(Math.random()* possible.length));
            }

            Models.Image.find({ filename: imgUrl }, function(err, images){
                if(images.length > 0){
                    saveImage();
                } else {         
                    
                    var tempPath = req.files[0].path,
                    ext = path.extname(req.files[0].originalname).toLowerCase();                   
                    targetPath = path.resolve('./public/upload/' + imgUrl + ext);

                    if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
                        fs.rename(tempPath, targetPath, function(err){
                            if(err) throw err;

                            var newImg = new Models.Image({
                                title: req.body.title,
                                filename: imgUrl + ext,
                                description: req.body.description
                            });

                            newImg.save(function(err, image){
                                res.redirect('/images/' + image.uniqueId)
                            });             
                        })
                    } else {
                        fs.unlink(tempPath, function(err){
                            if(err) throw err;
                            res.json(500, { error: 'Only image files are allowed'});
                        })
                    }
                }
            });
        };
        saveImage();
        
    },
    like: function(req, res) {
        res.json({ likes: 1});
    },
    comment: function(req, res) {
        res.send('The image:comment POST controller');
    }
};