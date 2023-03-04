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
    eventImage: {
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
    totalViews: {
        type: Number,
        default: 0
    },
    viewers: [{
        userInfo: {
            type: String,
            required: true,
            default: ''
        }
    }],
    usersLiked: [{
        userInfo: {
            type: String,
            required: true,
            default: ''
        }
    }],

    totalComments:{
        type: Number,
        default: 0
    },
    
    usersComments: [{
        userInfo: {
            type: String,
            required: true,
            default: ''
        },
        comments: {
            type: String,
            required: true,
            default: ''
        }
    }],
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