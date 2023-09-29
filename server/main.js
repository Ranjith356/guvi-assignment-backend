const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cors({ origin: true, credentials: true }));

const con = mysql.createConnection({
  user: "sql12649487",
  host: "sql12.freesqldatabase.com",
  password: "kAEh9hBJa9",
  database: "sql12649487",
});

app.post("/register", (req, res) => {
  const email = req.body.email;

  const username = req.body.username;
  const password = req.body.password;

  con.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, password],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send({ message: "ENTER CORRECT ASKED DETAILS!" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  con.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "WRONG USERNAME OR PASSWORD!" });
        }
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running backend server");
});
