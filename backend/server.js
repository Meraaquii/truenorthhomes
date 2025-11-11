const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  connectionLimit: 10,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database Connected Successfully");
    connection.release();
  } catch (err) {
    console.error("Database Not Connected:", err.message);
  }
})();

const BASE_URL = process.env.BASE_PATH;

app.post(`${BASE_URL}/login`, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ message: "Email and password are required" });

  try {
    const [results] = await pool.query(
      "SELECT * FROM admin WHERE email = ? AND password = ?",
      [email, password]
    );

    if (results.length > 0) {
      return res.json({
        status: 1,
        message: "Login successfully",
        user: results[0],
      });
    } else {
      return res.json({ status: 0, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Database query error:", err);
    return res.json({ message: "Database query error", error: err });
  }
});

app.post(`${BASE_URL}/responderList`, async (req, res) => {
  const {
    name,
    email,
    phone,
    comment,
    enquiry_form,
    utm_source,
    utm_id,
    utm_campaign,
    utm_medium,
    utm_term,
    utm_content,
    ip,
  } = req.body;
  const dateTime = new Date();

  if (
    !name ||
    !email ||
    !phone ||
    !comment ||
    !enquiry_form ||
    !utm_source ||
    !utm_id ||
    !utm_campaign ||
    !utm_medium ||
    !utm_term ||
    !utm_content ||
    !ip
  ) {
    return res.json({ message: "All fields are required" });
  }

  try {
    const [maxResult] = await pool.query(
      "SELECT MAX(id) AS maxid FROM responder_list"
    );
    const id = (maxResult[0].maxid || 0) + 1;

    const insertQuery = `
      INSERT INTO responder_list 
      (id, name, email, phone, comment, enquiry_form, utm_source, utm_id, utm_campaign, utm_medium, utm_term, utm_content, ip, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(insertQuery, [
      id,
      name,
      email,
      phone,
      comment,
      enquiry_form,
      utm_source,
      utm_id,
      utm_campaign,
      utm_medium,
      utm_term,
      utm_content,
      ip,
      dateTime,
    ]);

    return res.json({
      status: 1,
      message: "Responder details inserted successfully",
      data: {
        id,
        name,
        email,
        phone,
        comment,
        enquiry_form,
        utm_source,
        utm_id,
        utm_campaign,
        utm_medium,
        utm_term,
        utm_content,
        ip,
        date: dateTime,
      },
    });
  } catch (err) {
    console.error("Insert error:", err);
    return res.json({ message: "Database insert error", error: err });
  }
});

app.get(`${BASE_URL}/notifications`, async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT * FROM responder_list ORDER BY created_at DESC"
    );
    return res.json({
      status: 1,
      message: "Notifications fetched successfully",
      data: results,
    });
  } catch (err) {
    console.error("Database query error:", err);
    return res.json({ message: "Database query error", error: err });
  }
});

app.post(`${BASE_URL}/forgotPassword`, async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ message: "Email is required" });

  try {
    const [results] = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    if (results.length > 0) {
      // Simulate sending password via email
      // const password = results[0].password;
      // await sendPasswordEmail(process.env.EMAIL_USER, email, password);
      return res.json({ status: 1, message: "Password sent to your email" });
    } else {
      return res.json({ status: 0, message: "Email not found" });
    }
  } catch (err) {
    console.error("Database error:", err);
    return res.json({ message: "Database error", error: err });
  }
});

app.get(`${BASE_URL}/getResponderList`, async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM responder_list");
    return res.json({
      status: 1,
      message: "Responder Details retrieved successfully",
      data: results,
    });
  } catch (err) {
    console.error("Database query error:", err);
    return res.json({ message: "Database query error", error: err });
  }
});

app.post(`${BASE_URL}/logout`, (req, res) => {
  res.json({ status: 1, message: "Logged out successfully", data: {} });
});

const webPORT = 5000;
app.listen(webPORT, () => {
  console.log(`Server listening on port ${webPORT}`);
});
