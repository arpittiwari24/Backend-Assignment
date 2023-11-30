import pool from '../db.cjs';


const GetUrl =  async (req, res) => {
  try {
    const query = 'SELECT * FROM urls WHERE url_id = $1';
    const result = await pool.query(query, [req.params.urlId]);
    const url = result.rows[0];

    if (url) {
      const updateQuery = 'UPDATE urls SET clicks = clicks + 1 WHERE url_id = $1';
      await pool.query(updateQuery, [req.params.urlId]);

      return res.redirect(url.orig_url);
    } else {
      res.status(404).json('Not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
}

export default GetUrl;
