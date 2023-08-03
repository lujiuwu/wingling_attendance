const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    realname: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'default-avatar.jpg'
    },
    isClockedIn: {
        type: Boolean,
        default: false
    },
    totalDuration: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    targetTime: Number,
    taskCompletion: Number,
    grade: {
        type: String,
        enum: ['大一', '大二', '大三', '大四'],
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;