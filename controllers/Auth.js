import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";
import pool from "../db.cjs";

export const Setup = async (req, res) => {
  try {
    await pool.query('CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(50), email VARCHAR(30), password VARCHAR(100), urls JSONB[])')
    await pool.query('CREATE TABLE urls(id SERIAL PRIMARY KEY, orig_url VARCHAR(100), short_url VARCHAR(100), url_id VARCHAR(100),clicks INTEGER DEFAULT 0 NOT NULL, date DATE, user_id INTEGER REFERENCES users(id))')
    res.status(200).send({message: "Created both databases successfully"})
} catch (error) {
    console.log(error);
    res.sendStatus(500)
}
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    const user = result.rows[0];

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    const existingUser = result.rows[0];

    if (existingUser) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery =
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const insertedUser = await pool.query(insertQuery, [
      name,
      email,
      hashedPassword,
    ]);

    const user = insertedUser.rows[0];

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};



export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      //   sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      //   secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

export const getMyUrls = async (req,res) => {
  try {
    const query = 'SELECT * FROM urls WHERE user_id = $1'
    const result = await pool.query(query, [req.user.id])
    res.status(200).send(result.rows)
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}
