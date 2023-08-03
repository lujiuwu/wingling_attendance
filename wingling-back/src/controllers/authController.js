const User = require('../models/user');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

const secretKey = process.env.SECRET_KEY;

const loginController = (req, res) => {
    let { username, password } = req.body;
    User.findOne({ username: username, password: md5(password) }).lean().then(data => {
        if (!data) {
            return res.status(401).json({
                code: 'INCORRECT_PASSWORD',
                msg: '用户名或密码错误',
                data: null
            });
        }

        const token = jwt.sign({
            username: data.username,
            _id: data._id
        }, secretKey, {
            expiresIn: '3d'
        });

        res.json({
            code: 'SUCCESS',
            msg: '登陆成功',
            data: {...data, _token: token}
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            code: 'SERVER_ERROR',
            msg: '服务器错误，请稍后再试',
            data: null
        });
    });
};

module.exports = { loginController };