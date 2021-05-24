const express = require('express')
const router = express.Router()
const multer = require('multer')
const authCtrl = require('../controllers/auth')
const aws = require('aws-sdk')
const accessKey = 'AKIAIT2JDQRKDMTSU3MA';
const secretKey = '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';
const BUCKET_NAME = 'laas';
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: secretKey,
  accessKeyId: accessKey,
  region: 'us-east-1',
});


const s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    acl: 'public-read',
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 5 },
})

/*const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      //cb(null, new Date().toISOString() + file.originalname);
      cb(null, new Date().toISOString().replace(/:/g,'-') + '-' + file.originalname);
    }
})
  
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
}
  
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})*/

router.post('/signin', authCtrl.signUserIn)
router.post('/signup', upload.fields([{name: 'image', maxCount: 1},{name:'profilePicture'}]), authCtrl.createUser)

module.exports = router