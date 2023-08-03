require('dotenv').config({ path: '../../.env' });
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            code: 'UNAUTHORIZED',
            msg: '没有提供身份验证 Token',
            data: null
        });
    }
    jwt.verify(token, secretKey, { ignoreExpiration: false }, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // token 已过期
                return res.status(401).json({
                    code: 'UNAUTHORIZED',
                    msg: 'Token 已过期',
                    data: null
                });
            } else {
                // token 验证失败或其它错误
                return res.status(401).json({
                    code: 'FORBIDDEN',
                    msg: 'Token 验证失败',
                    data: null
                });
            }
        }
        req.user = decoded;
        next();
    })
}