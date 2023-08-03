const Attendance = require('../models/attendance');

const getWeeklyAttendanceController = (req, res) => {
    const userId = req.params.userId;

    // 获取本周的起始日期和结束日期
    const { startDate, endDate } = getWeekStartAndEndDate();

    Attendance.find({ userId, date: { $gte: startDate, $lte: endDate } })
        .then((attendance) => {
            res.json({ success: true, attendance });
        })
        .catch((error) => {
            res.status(500).json({ success: false, message: '无法获取本周的打卡记录', error });
        });
};

// 自定义函数，获取本周的起始日期和结束日期
const getWeekStartAndEndDate = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(today.setDate(today.getDate() + 6));
    endOfWeek.setHours(23, 59, 59, 999);
    return { startDate: startOfWeek, endDate: endOfWeek };
};


module.exports = {getWeeklyAttendanceController};