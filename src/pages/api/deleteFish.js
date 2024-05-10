import pool from '../../../lib/db';

export const config = {
  runtime: 'edge',
}

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      const query = 'DELETE FROM fishes WHERE id = $1 RETURNING *';
      const values = [id];
      const response = await pool.query(query, values);
      if (response.rows.length > 0) {
        res.status(200).json(response.rows[0]);
      } else {
        res.status(404).json({ message: 'Fish not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
