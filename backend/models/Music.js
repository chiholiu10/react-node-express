const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    release_year: {
        type: Number,
        required: true
    },
    genre_id: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    reviews: [{
        id: {
            type: Number,
            required: true
        },
        locale: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }]
});

const Music = mongoose.model("Music", musicSchema); // now we have to create our model 
console.log;

module.exports = Music;  // export our created model