
import { pool } from '../../../utils/database.js';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';


class AuthRepo {
  async SearchUser(body) {
    const { email, password } = body
    const query = {
      text:'SELECT * FROM users WHERE email = $1',
      values:[email]
    }
    const result= await pool.query(query);
    const user = result.rows[0];
    if (!user) {
      return null;
    }
    const verifyPass = await bcrypt.compare(password,user.password);
    if (!verifyPass) {
      return null;
    }
    return user.id
    
  }
  async Register(token) {
    const id = nanoid(16)
    const query = {
      text: `
    INSERT INTO authentications (id, token)
    VALUES ($1, $2)
    RETURNING *
  `,
      values:[id,token]
    }
    const result= await pool.query(query);

    return result.rows[0];
  }
  async SearchToken(token) {
    const query={
      text:`
      SELECT *
      FROM authentications
      WHERE token=$1
      `,
      values:[token]
      };

    const result=
    await pool.query(query);

    return result.rows[0];
  }
  async Delete(token) {
      
  const query={
  text:`
  DELETE FROM authentications
  WHERE token=$1
  RETURNING *
  `,
  values:[token]
  };

  const result=
  await pool.query(query);

  return result.rows[0];
  }
}

export default new AuthRepo();