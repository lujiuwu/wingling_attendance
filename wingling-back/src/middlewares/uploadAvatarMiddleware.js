const multer = require('multer');  // 引入 multer 文件上传中间件
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// 生成唯一文件名
const generateUniqueFileName = (file) => {
  const fileExtension = path.extname(file.originalname);
  return `${uuidv4()}${fileExtension}`;
};

// 配置 multer 中间件，用于处理文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/'));  // 设置文件存储的目录
  },
  filename: (req, file, cb) => {
    const uniqueFileName = generateUniqueFileName(file);
    cb(null, uniqueFileName); // 设置文件名
  }
});

const uploadAvatarMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 限制文件大小为 5MB
    files: 1 // 限制文件数量为 1
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('文件类型无效'));
    }
    cb(null, true);
  },
}).single('avatar');

module.exports = uploadAvatarMiddleware;