import multer from 'multer';
import response from '../utils/response.js';

export const uploadError = (
  err,
  req,
  res,
  next
)=>{

  if(err instanceof multer.MulterError){

    if(err.code==='LIMIT_FILE_SIZE'){
      return response(
        res,
        400,
        'Ukuran file maksimal 5 MB'
      );
    }
  }

  if(err){
    return response(
      res,
      400,
      err.message
    );
  }

  next();
};