const mongoose = require('mongoose');

const makeupClockSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: String,
    startTime: String,
    endTime: String,
    reason: String,
    status: String,
    duration: Number
});

const MakeupClock = mongoose.model('MakeupClock', makeupClockSchema);

module.exports = MakeupClock;