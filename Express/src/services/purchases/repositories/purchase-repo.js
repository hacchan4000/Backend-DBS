import { pool } from '../../../utils/database.js';
import { nanoid } from 'nanoid';


class PurchaseRepo {
  create = async(body) => {
    const id = nanoid(16)
    const { user_id, title, category, date, price} = body
    const query = {
      text:"INSERT INTO purchases (id,user_id,title,category_id,date,price) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      values:[id,user_id, title, category, date, price]
    }
    const res = await pool.query(query)
    return res.rows[0]
  }
  readUser = async(id) => {
    const query = {
      text:"SELECT * FROM purchases WHERE user_id = $1 ORDER BY date DESC",
      values:[id]
    }
    const res = await pool.query(query)
    return res.rows
  }
}

export default new PurchaseRepo();