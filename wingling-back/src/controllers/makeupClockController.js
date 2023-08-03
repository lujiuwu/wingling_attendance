const MakeupClock = require('../models/makeupClock');
const User = require('../models/user');
const moment = require('moment');
const { sendMail } = require('../utils/mailer');

const createMakeupClockController = (req, res) => {
    const { userId, reason, duration, date, startTime, endTime, realname } = req.body;

    const newMakeupClock = new MakeupClock({
        userId: userId,
        date: date,
        startTime: startTime,
        endTime: endTime,
        reason: reason,
        status: 'pending',
        duration: duration
    });

    newMakeupClock.save()
        .then((savedMakeupClock) => {
            return User.find({ isAdmin: true })
                .then(admins => {
                    const mailOptions = {
                        from: process.env.MAIL_USER,
                        to: admins.map(admin => admin.email),
                        subject: '补卡申请通知',
                        html: `
                        <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                        <div style="margin: 20px auto; max-width: 600px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 10px; border: 2px solid #005ea5;">
                            <div style="background-color: #005ea5; padding: 20px; color: #ffffff; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                            <img src="https://s1.imagehub.cc/images/2023/07/29/logo.png" alt="logo.png" style="max-width: 200px;">
                            <h2 style="margin-top: 15px; font-family: 'Arial Black', Arial, sans-serif;">补卡申请通知</h2>
                            <h3 style="margin-top: 10px; font-family: 'Lucida Handwriting', cursive; color: #ffffff;">翼灵物联网工作室</h3>
                            </div>
                            <div style="padding: 20px;">
                            <p style="font-size: 18px; color: #333333; line-height: 1.6;">尊敬的管理员，</p>
                            <p><strong style="font-size: 18px; color: #005ea5;">${realname}</strong> 发起了一项补卡申请，详情如下：</p>
                            <ul style="list-style: none; padding-left: 0; margin-bottom: 15px;">
                                <li><strong style="color: #005ea5;">补卡理由：</strong> <span style="color: #666666;">${reason}</span></li>
                                <li><strong style="color: #005ea5;">补卡时长：</strong> <span style="color: #666666;">${duration}分钟</span></li>
                                <li><strong style="color: #005ea5;">补卡日期：</strong> <span style="color: #666666;">${moment(date).format('YYYY-MM-DD')}</span></li>
                                <li><strong style="color: #005ea5;">起始时间：</strong> <span style="color: #666666;">${startTime}</span></li>
                                <li><strong style="color: #005ea5;">结束时间：</strong> <span style="color: #666666;">${endTime}</span></li>
                            </ul>
                            <p style="font-size: 18px; color: #333333; line-height: 1.6;">请及时处理！</p>
                            <a href="https://example.com/quick-processing" style="display: block; text-align: center; margin-top: 20px; padding: 10px 0; background-color: #005ea5; color: #ffffff; text-decoration: none; border-radius: 5px;">快速处理申请</a>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: center; margin-top: 20px; border-top: 2px solid #005ea5; padding: 20px; color: #005ea5; font-size: 14px; text-align: center; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                            <p style="margin: 0;">本邮件由翼灵物联网工作室自动发出，请勿回复。</p>
                            </div>
                        </div>
                        <h3 style="font-family: 'Lucida Handwriting', cursive; text-align: center; margin-top: 20px;">Wingling</h3>
                        </body>
                        `
                    };
                    return sendMail(mailOptions)
                        .then(info => {
                            console.log('邮件发送成功：', info);
                            return savedMakeupClock;
                        })
                        .catch(err => {
                            console.error('邮件发送失败：', err);
                            return savedMakeupClock;
                        });
                });
        })
        .then(savedMakeupClock => {
            res.json({
                code: 'SUCCESS',
                msg: '创建补卡申请成功',
                data: savedMakeupClock
            });
        })
        .catch((err) => {
            console.error('创建补卡申请失败：', err);
            res.status(500).json({
                code: 'SERVER_ERROR',
                msg: '服务器错误，请稍后再试',
                data: null
            });
        });
}

// 用户自己补卡列表
const getUserMakeupClockController = (req, res) => {
    const userId = req.params.userId;
    MakeupClock.find({ userId: userId })
        .then((makeupClocks) => {
            res.json({
                code: 'SUCCESS',
                msg: '获取补卡列表成功',
                data: makeupClocks
            });
        })
        .catch((err) => {
            console.error('获取补卡列表失败：', err);
            res.status(500).json({
                code: 'SERVER_ERROR',
                msg: '服务器错误，请稍后再试',
                data: null
            });
        });
}


// 管理员获取补卡列表
const getMakeupClockController = (req, res) => {
    MakeupClock.find({ status: 'pending' })
        .then((makeupClocks) => {
            res.json({
                code: 'SUCCESS',
                msg: '获取补卡申请成功',
                data: makeupClocks
            });
        })
        .catch((err) => {
            console.error('获取补卡申请失败：', err);
            res.status(500).json({
                code: 'SERVER_ERROR',
                msg: '服务器错误，请稍后再试',
                data: null
            });
        });
};

const updateMakeupClockController = (req, res) => {
    const makeupClockId = req.params.makeupClockId;
    const { status, rejectReason } = req.body;

    // 更新补卡申请状态
    MakeupClock.findByIdAndUpdate(makeupClockId, { status }, { new: true })
        .then((updatedMakeupClock) => {
            // 解构出补卡时长
            const { duration, reason, date, startTime, endTime } = updatedMakeupClock;

            // 获取用户的当天打卡记录
            return User.findById(updatedMakeupClock.userId).then((user) => {
                // 如果状态为pass，则将补卡时长加入用户的总打卡时长
                if (status === 'pass') {
                    // 更新用户的当天总打卡时长，加上补卡时长
                    user.totalDuration = (user.totalDuration || 0) + duration;
                    const mailOptions = {
                        from: process.env.MAIL_USER,
                        to: user.email,
                        subject: '补卡申请已处理',
                        html: `
                        <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                            <div style="margin: 20px auto; max-width: 600px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 10px; border: 2px solid #005ea5;">
                                <div style="background-color: #005ea5; padding: 20px; color: #ffffff; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                                <img src="https://s1.imagehub.cc/images/2023/07/29/logo.png" alt="logo.png" style="max-width: 200px;">
                                <h2 style="margin-top: 15px; font-family: 'Arial Black', Arial, sans-serif;">补卡申请通知</h2>
                                <h3 style="margin-top: 10px; font-family: 'Lucida Handwriting', cursive; color: #ffffff;">翼灵物联网工作室</h3>
                                </div>
                                <div style="padding: 20px;">
                                <p style="font-size: 18px; color: #333333; line-height: 1.6;">尊敬的 <span style="color: #005ea5;">${user.realname}</span></p>
                                <p><strong style="font-size: 18px; color: #005ea5;">您的补卡申请<span style="color: #19C37D">审批通过</span></strong> ，详情如下：</p>
                                <ul style="list-style: none; padding-left: 0; margin-bottom: 15px;">
                                    <li><strong style="color: #005ea5;">补卡理由：</strong> <span style="color: #666666;">${reason}</span></li>
                                    <li><strong style="color: #005ea5;">补卡时长：</strong> <span style="color: #666666;">${duration}分钟</span></li>
                                    <li><strong style="color: #005ea5;">补卡日期：</strong> <span style="color: #666666;">${moment(date).format('YYYY-MM-DD')}</span></li>
                                    <li><strong style="color: #005ea5;">起始时间：</strong> <span style="color: #666666;">${startTime}</span></li>
                                    <li><strong style="color: #005ea5;">结束时间：</strong> <span style="color: #666666;">${endTime}</span></li>
                                </ul>
                                <p style="font-size: 18px; color: #333333; line-height: 1.6;">感谢您的使用！</p>
                                </div>
                                <div style="display: flex; align-items: center; justify-content: center; margin-top: 20px; border-top: 2px solid #005ea5; padding: 20px; color: #005ea5; font-size: 14px; text-align: center; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                                <p style="margin: 0;">本邮件由翼灵物联网工作室自动发出，请勿回复。</p>
                                </div>
                            </div>
                            <h3 style="font-family: 'Lucida Handwriting', cursive; text-align: center; margin-top: 20px;">Wingling</h3>
                        </body>
                        `
                    };
                    sendMail(mailOptions)
                        .then(info => {
                            console.log('邮件发送成功：', info);
                        })
                        .catch(err => {
                            console.error('邮件发送失败：', err);
                        });
                    return user.save().then((updatedUser) => {
                        res.json({
                            code: 'SUCCESS',
                            msg: '处理补卡申请成功',
                            data: updatedUser
                        });
                    });
                } else {
                    // 如果状态为reject，则直接返回成功
                    const mailOptions = {
                        from: process.env.MAIL_USER,
                        to: user.email,
                        subject: '补卡申请已处理',
                        html: `
                        <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                            <div style="margin: 20px auto; max-width: 600px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 10px; border: 2px solid #005ea5;">
                                <div style="background-color: #005ea5; padding: 20px; color: #ffffff; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                                <img src="https://s1.imagehub.cc/images/2023/07/29/logo.png" alt="logo.png" style="max-width: 200px;">
                                <h2 style="margin-top: 15px; font-family: 'Arial Black', Arial, sans-serif;">补卡申请通知</h2>
                                <h3 style="margin-top: 10px; font-family: 'Lucida Handwriting', cursive; color: #ffffff;">翼灵物联网工作室</h3>
                                </div>
                                <div style="padding: 20px;">
                                <p style="font-size: 18px; color: #333333; line-height: 1.6;">尊敬的 <span style="color: #005ea5;">${user.realname}</span></p>
                                <p><strong style="font-size: 18px; color: #005ea5;">您的补卡申请<span style="color: #ff0000">审批被拒绝</span></strong> ，详情如下：</p>
                                <ul style="list-style: none; padding-left: 0; margin-bottom: 15px;">
                                    <li><strong style="color: #005ea5;">拒绝理由：</strong> <span style="color: #ff0000;">${rejectReason}</span></li>
                                    <li><strong style="color: #005ea5;">补卡理由：</strong> <span style="color: #666666;">${reason}</span></li>
                                    <li><strong style="color: #005ea5;">补卡时长：</strong> <span style="color: #666666;">${duration}分钟</span></li>
                                    <li><strong style="color: #005ea5;">补卡日期：</strong> <span style="color: #666666;">${moment(date).format('YYYY-MM-DD')}</span></li>
                                    <li><strong style="color: #005ea5;">起始时间：</strong> <span style="color: #666666;">${startTime}</span></li>
                                    <li><strong style="color: #005ea5;">结束时间：</strong> <span style="color: #666666;">${endTime}</span></li>
                                </ul>
                                <p style="font-size: 18px; color: #333333; line-height: 1.6;">感谢您的使用！</p>
                                </div>
                                <div style="display: flex; align-items: center; justify-content: center; margin-top: 20px; border-top: 2px solid #005ea5; padding: 20px; color: #005ea5; font-size: 14px; text-align: center; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                                <p style="margin: 0;">本邮件由翼灵物联网工作室自动发出，请勿回复。</p>
                                </div>
                            </div>
                            <h3 style="font-family: 'Lucida Handwriting', cursive; text-align: center; margin-top: 20px;">Wingling</h3>
                        </body>
                        `
                    };
                    sendMail(mailOptions)
                        .then(info => {
                            console.log('邮件发送成功：', info);
                        })
                        .catch(err => {
                            console.error('邮件发送失败：', err);
                        });
                    res.json({
                        code: 'SUCCESS',
                        msg: '处理补卡申请成功',
                        data: null
                    });
                }
            });
        }).catch((err) => {
            console.error('处理补卡申请失败：', err);
            res.status(500).json({
                code: 'SERVER_ERROR',
                msg: '服务器错误，请稍后再试',
                data: null
            });
        });
}

const deleteMakeupClockController = (req, res) => {
    const makeupClockId = req.params.makeupClockId;

    MakeupClock.findOneAndDelete(makeupClockId).then((deletedMakeupClock) => {
        res.json({
            code: 'SUCCESS',
            msg: '删除成功',
            data: deletedMakeupClock
        });
    }).catch((err) => {
        console.error("删除补卡申请失败：", err);
        res.status(500).json({
            code: 'SERVER_ERROR',
            msg: '服务器错误，请稍后再试',
            data: null
        })
    })
}

module.exports = { createMakeupClockController, getMakeupClockController, updateMakeupClockController, getUserMakeupClockController, deleteMakeupClockController };