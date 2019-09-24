const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', function(err){
    console.log('connection error', err);
});
 
db.once('open', function(){
    console.log('Connection to DB successful');
});

module.exports = db;