var sidebar = require('./helpers/sidebar'),
    ImageModel = require('../models').Image;

var viewModel = {
    images : []
};

module.exports = {
    index: function(req, res) {        
        ImageModel.find({}, {}, {sort: { timestamp: -1 }}, function(err, images){
            if(err) throw err;

            viewModel.images = images.map(function(data) { return data.toObject(); });  
            sidebar(viewModel, function(viewModel){                
                res.render('index', viewModel);
            });            
        });        
    }
};