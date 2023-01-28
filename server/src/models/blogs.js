const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    upvoteCount: {
        type: Number,
        required: true,
        default: 0,
    },
    user_id: {
        type: String,
        required: true
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('tur1ng_blog', blogSchema);