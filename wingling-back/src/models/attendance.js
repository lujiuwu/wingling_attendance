const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    clockInTimes: [{
        type: Date
    }],
    clockOutTimes: [{
        type: Date
    }]
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;