const path = require("path");
const multer = require("multer"); //Para poder subir archivos

//*Para que funcione Multer
const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    let folder = path.join(__dirname, '../../public/img/users');
    
    //console.log('folder',folder);

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

module.exports =  upload;