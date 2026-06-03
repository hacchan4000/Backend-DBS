import { NotFoundError } from '../../../exceptions/index.js';
import redisClient from '../../../utils/redis.js';
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

    const cacheKey = `users:${id}`
    const cache = await redisClient.get(cacheKey)
    if (cache) {
      res.set(
        'X-Data-Source',
        'cache'
      );

      return response(
        res,
        200,
        'berhasil ambil users',
        JSON.parse(cache)
      );
    }
    const user = await userRepo.read(id);

    if(!user){
      return next(
        new NotFoundError(
          'user tidak ditemukan'
        )
      );
    }
    await redisClient.setEx(cacheKey,3600,JSON.stringify(user))

    res.set(
      'X-Data-Source',
      'database'
    );

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