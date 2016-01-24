var mongoose = require('mongoose');

// define the schema for our user model
var bountySchema = mongoose.Schema({

    location: {
        latitude: Number,
        longitude: Number,
        name: String,
    },
    title: String,
    amount: Number,
    time: Date,
    notes: String,
    userId: String,
    username: String
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Bounty', bountySchema);