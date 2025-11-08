const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

connection.connect((err) => {
  if (err) console.log("Database Not Connected:", err.sqlMessage);
  else console.log("Database Connected Successfully");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ message: "Email and password are required" });

  const query = "SELECT * FROM admin WHERE email = ? AND password = ?";
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.json({ message: "Database query error", error: err });
    }
    if (results.length > 0) {
      return res.json({
        status: 1,
        message: "Login successfully",
        user: results[0],
      });
    } else {
      return res.json({ status: 0, message: "Invalid email or password" });
    }
  });
});

app.post("/responder_list", (req, res) => {
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

  const employeeDataQuery = "SELECT MAX(id) as maxid FROM responder_list;";
  connection.query(employeeDataQuery, (err, results) => {
    if (err) {
      console.error("Error fetching max ID:", err);
      return res.json({ message: "Database error", error: err });
    }

    const id = (results[0].maxid || 0) + 1;
    const insertQuery =
      "INSERT INTO responder_list (id, name, email, phone, comment, enquiry_form, utm_source, utm_id, utm_campaign, utm_medium, utm_term, utm_content, ip, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      insertQuery,
      [
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
      ],
      (err, result) => {
        if (err) {
          console.error("Insert error:", err);
          return res.json({ message: "Database insert error", error: err });
        } else {
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
        }
      }
    );
  });
});
app.get("/notifications", (req, res) => {
  const query = "SELECT * FROM responder_list ORDER BY created_at DESC";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.json({ message: "Database query error", error: err });
    }
    return res.json({
      status: 1,
      message: "Notifications fetched successfully",
      data: results,
    });
  });
});

app.post("/forgotPassword", (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ message: "Email is required" });

  const query = "SELECT * FROM user WHERE email = ?";
  connection.query(query, [email], async (err, results) => {
    if (err) return res.json({ message: "Database error", error: err });

    if (results.length > 0) {
      try {
        const password = results[0].password;
        // await sendPasswordEmail(process.env.EMAIL_USER, email, password);
        return res.json({ status: 1, message: "Password sent to your email" });
      } catch (err) {
        return res.json({ message: "Failed to send email", error: err });
      }
    } else {
      return res.json({ status: 0, message: "Email not found" });
    }
  });
});

app.get("/responder_list", (req, res) => {
  const query = "SELECT * FROM responder_list";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.json({ message: "Database query error", error: err });
    }
    return res.json({
      status: 1,
      message: "Responder Details retrieved successfully",
      data: results,
    });
  });
});

app.post("/logout", (req, res) => {
  res.json({ status: 1, message: "Logged out successfully", data: {} });
});

const webPORT = 5000;
app.listen(webPORT, () => {
  console.log(`Server listening on port ${webPORT}`);
});
