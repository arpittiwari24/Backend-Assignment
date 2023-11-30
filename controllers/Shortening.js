import { nanoid } from 'nanoid';
import pool from '../db.cjs';
import validateUrl from '../utils/utils.js';

const shortening =  async (req, res) => {
  const { origUrl } = req.body;
  const base = process.env.BASE;
  const userId = req.user.id;

  const urlId = nanoid(6);
  if (validateUrl(origUrl)) {
    try {
      const query = 'SELECT * FROM urls WHERE orig_url = $1 AND user_id = $2';
      const result = await pool.query(query, [origUrl, userId]);
      const existingUrl = result.rows[0];

      if (existingUrl) {
        res.json(existingUrl);
      } else {
        const shortUrl = `${base}/${urlId}`;

        const insertQuery = 'INSERT INTO urls (orig_url, short_url, url_id, date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const insertedUrl = await pool.query(insertQuery, [origUrl, shortUrl, urlId, new Date(), userId]);
        const url = insertedUrl.rows[0];

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
}

export default shortening;
