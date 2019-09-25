const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apax_weather', { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', function(err){
    console.error('connection error', err);
});
 
db.once('open', function(){
    console.log('Connection to DB successful');
});

module.exports = db;
