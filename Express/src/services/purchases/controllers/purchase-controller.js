import response from "../../../utils/response.js"
import purchaseRepo from "../repositories/purchase-repo.js"

export const create = async(req, res, next) => {
  try {
    
    const hasil = await purchaseRepo.create(req.body)

    return response(res,200,'berhasil buat purchase', hasil)
    
  } catch (error) {
    next(error)
  }

}
export const read = async(req, res, next) => {
  try {
    const { user_id } = req.query
    const hasil = await purchaseRepo.readUser(user_id)
    return response( res, 200, 'Berhasil mengambil purchase', hasil );
  } catch (error) {
    next(error)
  }
}
export const update = async(req, res, next) => {
  try {
    
  } catch (error) {
    
  }
}
export const del = async(req, res, next) => {
  try {
    
  } catch (error) {
    
  }
}