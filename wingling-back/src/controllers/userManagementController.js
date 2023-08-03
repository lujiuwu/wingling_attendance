const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const md5 = require('md5');

const createUserController = (req, res) => {
    const { username, password, realname, targetTime, grade, isAdmin, email } = req.body;
    const user = new User({
        username,
        password: md5(password),
        realname,
        targetTime,
        grade,
        isAdmin,
        email,
        avatar: "/uploads/default-avatar.jpg"
    });

    user.save().then(() => {
        res.status(201).json({
            code: 'SUCCESS',
            msg: '注册成功',
            data: null
        });
    }).catch((err) => {
        console.error(err);
        res.status(500).json({
            code: 'SERVER_ERROR',
            msg: '服务器错误，请稍后再试',
            data: null
        });
    });
};

const editUserController = (req, res) => {
    const userId = req.params.userId;

    User.findById(userId)
        .then(user => {
            if (req.file) {
                const newAvatar = req.file.filename;

                // 检查文件类型是否是图像文件
                if (!req.file.mimetype.startsWith('image/')) {
                    fs.unlink(req.file.path, err => {
                        if (err) {
                            console.error('删除文件失败：', err);
                        }
                    });
                    return res.status(400).json({
                        code: 'INVALID_FILE_TYPE',
                        msg: '文件类型无效',
                        data: null
                    });
                }

                // 检查文件大小是否超过限制
                if (req.file.size > 1024 * 1024 * 5) {
                    fs.unlink(req.file.path, err => {
                        if (err) {
                            console.error('删除文件失败：', err);
                        }
                    });
                    return res.status(400).json({
                        code: 'FILE_TOO_LARGE',
                        msg: '文件太大，不能超过 5MB',
                        data: null
                    });
                }

                if (user.avatar !== "/uploads/default-avatar.jpg") {
                    const oldAvatarFileName = path.basename(user.avatar);

                    const oldAvatarPath = path.join(__dirname, '..', '..', 'uploads', oldAvatarFileName);
                    fs.unlink(oldAvatarPath, err => {
                        if (err) {
                            console.error('删除旧头像文件失败：', err);
                        }
                    });
                }

                user.avatar = `/uploads/${newAvatar}`;
            } else {
                const { username, password, targetTime, grade, isAdmin, email } = req.body;

                user.username = username;
                user.password = md5(password);
                user.email = email;

                if (isAdmin !== undefined) {
                    user.isAdmin = isAdmin;
                }

                if (grade !== undefined) {
                    user.grade = grade;
                }

                if (targetTime !== undefined) {
                    user.targetTime = targetTime;
                }
            }

            return user.save();
        })
        .then(updatedUser => {
            res.json({
                code: 'SUCCESS',
                msg: '更新成功',
                data: updatedUser,
            });
        })
        .catch(err => {
            console.error('更新失败：', err);
            res.status(500).json({
                code: 'SERVER_ERROR',
                msg: '服务器错误，请稍后再试',
                data: null
            })
        });
};

const deleteUserController = (req, res) => {
    const userId = req.params.userId;

    User.findById(userId).then(user => {
        if (user.avatar !== "/uploads/default-avatar.jpg") {
            const oldAvatarFileName = path.basename(user.avatar);

            const oldAvatarPath = path.join(__dirname, '..', '..', 'uploads', oldAvatarFileName);
            fs.unlink(oldAvatarPath, err => {
                if (err) {
                    console.error('删除旧头像文件失败：', err);
                }
            });
        }

        return User.findByIdAndDelete(userId);
    }).then(deletedUser => {
        res.json({
            code: 'SUCCESS',
            msg: '删除成功',
            data: deletedUser
        });
    }).catch(err => {
        console.error('删除用户失败：', err);
        res.status(500).json({
            code: 'SERVER_ERROR',
            msg: '服务器错误，请稍后再试',
            data: null
        });
    });
};

module.exports = { createUserController, editUserController, deleteUserController };