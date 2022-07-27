// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://myappuser:MaajX7F0woW8UhYN@cluster-comp229-elitepr.9lhzsup.mongodb.net/eliteProductDatabase?retryWrites=true&w=majority";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}