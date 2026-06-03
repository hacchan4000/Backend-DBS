import multer from 'multer';
import InvariantError from '../exceptions/invariantError.js';

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'src/uploads/');
  },

  filename:(req,file,cb)=>{
    cb(
      null,
      `${Date.now()}-${file.originalname}`
    );
  }
});

const fileFilter=(req,file,cb)=>{
  if(file.mimetype !== 'application/pdf'){
    return cb(
      new InvariantError(
        'File is required'
      ),
      false
    );
  }

  cb(null,true);
};

export const upload = multer({
  storage,
  fileFilter,

  limits:{
    fileSize:5*1024*1024
  }
});