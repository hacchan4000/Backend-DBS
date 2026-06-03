import fs from 'fs';
import path from 'path';

import response from '../../../utils/response.js';

import documentRepo from '../repositories/doc-repo.js';
import NotFoundError from '../../../exceptions/notFoundError.js';
import docRepo from '../repositories/doc-repo.js';

export const uploadDocument = async(req,res,next)=>{
  try{

    if(!req.file){
      return response(
        res,
        400,
        'File is required'
      );
    }

    const data={
      user_id:req.user.id,
      file_name:req.file.filename,
      file_url:req.file.path
    };
    console.log(req.user)

    const result=
    await documentRepo.create(data);

    return response(
      res,
      201,
      'Dokumen berhasil diupload',
      {
        documentId: result.id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
      }
    );

  }catch(error){
    next(error);
  }
};

export const getDocumentById = async(req,res,next)=>{
  try {

    const { id } = req.params;

    const document = await documentRepo.readId(id);

    if (!document) {
      return next(
        new NotFoundError(
          'Dokumen tidak ditemukan'
        )
      );
    }

    const filePath = path.resolve(
      document.file_url
    );

    if (!fs.existsSync(filePath)) {
      return next(
        new NotFoundError(
          'File tidak ditemukan'
        )
      );
    }

    res.setHeader(
      'Content-Type',
      'application/pdf'
    );

    res.setHeader(
      'Content-Disposition',
      `inline; filename="${document.file_name}"`
    );

    return res.sendFile(filePath);

  } catch(error){
    next(error);
  }
};
export const getAllDocument = async (req,res,next) => {
  try {
    const hasil = await docRepo.read()
    return response(res, 200, 'berhasil list documents', {['documents']: hasil})
  } catch (error) {
    next(error)
  }
}

export const deleteDocument =async(req,res,next)=>{
  try{

  const {id}=req.params;
  const document=await documentRepo.readId(id);

  if(!document){
    return next(new NotFoundError('Document tidak ditemukan'));
  }

  const filePath=path.resolve(document.file_url);

  if(fs.existsSync(filePath)){
  fs.unlinkSync(filePath);
  }

  await documentRepo.delete(id);

  return response(
  res,
  200,
  'Document berhasil dihapus'
  );

  }catch(error){
  next(error);
  }
};