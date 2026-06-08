import response from "../../../utils/response.js";
import authRepo from "../repositories/auth-repo.js";
import { TokenManager } from '../../../security/token-manager.js';
import AuthenticationError from '../../../exceptions/authError.js';
import InvariantError from "../../../exceptions/invariantError.js";


export const login = async(req,res,next)=>{
  try{
    const {
      email,
      password
    } = req.validate;

    const user =
      await authRepo.SearchUser({
        email,
        password
      });
    

    if(!user.id){
      return next(
        new AuthenticationError(
          'Email atau password salah'
        )
      );
    }

    // token HARUS simpan id user asli
    const access_token =
      TokenManager.generateAccessToken({
        id:user.id
      });

    const refreshToken =
      TokenManager.generateRefreshToken({
        id:user.id
      });

    await authRepo.Register(
      user.id,
      refreshToken
    );

    return response(
      res,
      200,
      'Login berhasil',
      {
        name:user.name,
        access_token,
        refreshToken
      }
    );

  }catch(error){
    next(error);
  }
};
export const refresh = async (req, res, next) => {

  const { refreshToken } = req.validate;

  const result = await authRepo.SearchToken(refreshToken)
  if (!result) {
    return next(new InvariantError('Refresh token tidak valid'));
  }

  const { id } = TokenManager.verifyRefreshToken(refreshToken)
  const newAccessToken = TokenManager.generateAccessToken({ id })

  return response(res, 200, 'Access Token berhasil diperbarui', { accessToken: newAccessToken })
}


export const logout = async (req, res, next) => {
  const { refreshToken } = req.validate;
    const result = await authRepo.SearchToken(refreshToken)

    if (!result) {
      return next(new InvariantError('Refresh token tidak valid'));
    }

    await authRepo.Delete(refreshToken);
    return response(res, 200, 'Refresh token berhasil dihapus');
}
