// dependency multer
const multer = require('multer');
// dependency path
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Direktori tempat file akan disimpan
    },
    filename: (req, file, cb) => {
      cb(null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)); // Nama file yang akan disimpan
    },
  });
  
  const upload = multer({ storage: storage });

  module.exports = upload
