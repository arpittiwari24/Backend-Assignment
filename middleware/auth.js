import pool from "../db.cjs";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Please login",
    });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const query = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(query, [decoded._id]);
    const user = result.rows[0];
    
    req.user = user;
    next();
};
