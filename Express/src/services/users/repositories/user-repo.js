import { nanoid } from 'nanoid';
import { pool } from '../../../utils/database.js';
import bcrypt from 'bcrypt';


class UserRepo {

  async create(body){
    const data = {...body, id: nanoid(16)};

    data.password = await bcrypt.hash( data.password, 10);

    const keys=Object.keys(data);
    const values=Object.values(data);

    const kolom=keys.join(', ');

    const valuePlaceholder=
      keys
      .map((_,i)=>`$${i+1}`)
      .join(', ');

    const query={
      text:`
        INSERT INTO users
        (${kolom})
        VALUES (${valuePlaceholder})
        RETURNING id,name,email
      `,
      values
    };

    const result=
      await pool.query(query);

    return result.rows[0];
  }


  async read(id) {
    const query = {
      text: `
        SELECT *
        FROM users
        WHERE id = $1
      `,
      values: [id]
    };

    const result = await pool.query(query);

    return result.rows[0];
  }

}


export default new UserRepo();