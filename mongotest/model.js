var mongose = require('mongoose'),
    Schema = mongose.Schema;

mongose.connect('mongodb://localhost:27017/mongotest');
mongose.connection.on('open', function(){
    console.log('Mongoose Connected');
});

var Account = new Schema({
    username: { type: String, unique: true },
    date_created: { type: Date, default: Date.now },
    visits: { type: Number, default: 0 },
    active: { type: Boolean, default: false }
});

var AccountModel = mongose.model('Account', Account);

module.exports = function() {
    return AccountModel;
};
    