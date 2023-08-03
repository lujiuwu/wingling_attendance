const User = require('../models/user');

const getCurrentProgressController = (req, res) => {
    User.find() // 查询所有用户的打卡时长
    .then((users) => {
      res.json({
        code: 'SUCCESS',
        msg: '获取当前所有用户进度成功',
        data: users
      });
    })
    .catch((err) => {
      console.error('获取当前所有用户进度失败：', err);
      res.status(500).json({
        code: 'SERVER_ERROR',
        msg: '服务器错误，请稍后再试',
        data: null
      });
    });
};

const getUserProgressController = (req, res) => {
    const userId = req.params.userId;
    User.findById(userId) // 查询特定用户打卡时长
    .then((user) => {
      res.json({
        code: 'SUCCESS',
        msg: '加载用户打卡信息成功',
        data: user
      });
    })
    .catch((err) => {
      console.error('获取当前所有用户进度失败：', err);
      res.status(500).json({
        code: 'SERVER_ERROR',
        msg: '服务器错误，请稍后再试',
        data: null
      });
    });
};

module.exports = { getCurrentProgressController, getUserProgressController };