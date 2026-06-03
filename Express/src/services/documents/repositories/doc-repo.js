import { nanoid } from 'nanoid';
import { pool } from '../../../utils/database.js';

class DocumentRepo {

  async create(body){

    const data={
    ...body,
    id:nanoid(16)
    };

    const keys=Object.keys(data);
    const values=Object.values(data);

    const kolom=keys.join(', ');

    const placeholder=keys.map((_,i)=>`$${i+1}`).join(', ');

    const query={
    text:`
    INSERT INTO documents
    (${kolom})
    VALUES
    (${placeholder})
    RETURNING *
    `,
    values
    };

    const result=await pool.query(query);

    return result.rows[0];
  }

  async read(){
    const query={
    text:`
    SELECT *
    FROM documents 
    `
    };

    const result=await pool.query(query);

    return result.rows;
  }
  async readId(id){

    const query={
    text:`
    SELECT *
    FROM documents
    WHERE id=$1
    `,
    values:[id]
    };

    const result=await pool.query(query);

    return result.rows[0];
  }


  async delete(id){

    const query={
    text:`
    DELETE FROM documents
    WHERE id=$1
    RETURNING id
    `,
    values:[id]
    };

    const result=
    await pool.query(query);

    return result.rows[0];

  }

}

export default new DocumentRepo();