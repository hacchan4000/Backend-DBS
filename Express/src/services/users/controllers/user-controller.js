import { NotFoundError } from '../../../exceptions/index.js';
import response from "../../../utils/response.js"
import userRepo from "../repositories/user-repo.js"


export const registerController = async(req,res,next)=>{
  try{

    const { body } = req;
    const result = await userRepo.create(body);

    return response(
      res,
      201,
      'user berhasil ditambahkan',
      result
    );

  }catch(error){
    next(error);
  }
}

export const getUserById = async(req,res,next) => {
  try{

    const { id } = req.params;

    
    const user = await userRepo.read(id);

    if(!user){
      return next(
        new NotFoundError(
          'user tidak ditemukan'
        )
      );
    }


    return response(
      res,
      200,
      'berhasil ambil user',
      user
    );

  } catch(error){
    next(error);
  }
}