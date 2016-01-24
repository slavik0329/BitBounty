var mongoose = require('mongoose');

// define the schema for our user model
var feedEventSchema = mongoose.Schema({

    location: {
        latitude: Number,
        longitude: Number,
        name: String,
    },
    meals: Number,
    time: Date,
    note: String,
    image: String,
    userId: String,
    username: String
});


// create the model for users and expose it to our app
module.exports = mongoose.model('FeedEvent', feedEventSchema);