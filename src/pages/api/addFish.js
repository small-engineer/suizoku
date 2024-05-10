import pool from '../../../lib/db';

export const config = {
  runtime: 'edge',
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { src, angle, speed } = req.body;
      const query = 'INSERT INTO fishes (src, angle, speed) VALUES ($1, $2, $3) RETURNING *';
      const values = [src, angle, speed];
      const response = await pool.query(query, values);
      res.status(200).json(response.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
