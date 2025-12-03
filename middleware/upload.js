const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination(req, file, callbackFn) {
    callbackFn(null, 'uploads/')
  },
  filename(req, file, callbackFn) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    callbackFn(null, `${date}-${file.originalname}`)
  }
})

const fileFilter = (req, file, callbackFn) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    callbackFn(null, true)
  }
  else {
    callbackFn(null, false)
  }
}

const limits = {
  fileSize: 1024 * 1024 * 5
}

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
})