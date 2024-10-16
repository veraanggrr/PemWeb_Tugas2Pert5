const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pertemuan5",
});

connection.connect((err) => {
  if (err) {
    console.error("Terjadi kesalahan dalam kondeksi ke MySql:", err.stack);
    return;
  }
  console.log("Koneksi MySQL berhasil dengan id");
});

app.set("view engine", "ejs");

//ini adalah routing (create, read, update, delete)

//read
app.get("/", (req, res) => {
  const query = "SELECT * FROM users";
  connection.query(query, (err, results) => {
    res.render("index", { users: results });
  });
});

//create / input / insert
app.post("/add", (req, res) => {
  const { Name, email, phone } = req.body;
  const query = "INSERT INTO users (Name, email, phone) VALUES (?, ?, ?)";
  connection.query(query, [Name, email, phone], (err, results) => {
    if (err) throw err;
    res.redirect("/"); // Redirect to root URL
  });
});

//update

app.get("/edit/:id", (req, res) => {
  const query = "SELECT * FROM users WHERE id = ?";
  connection.query(query, [req.params.id], (err, result) => {
    if (err) throw err;
    res.render("edit", { users: result[0] });
  });
});

app.post("/update/:id", (req, res) => {
  const { Name, email, phone } = req.body;
  const query = "UPDATE users SET Name = ?, email = ?, phone = ? WHERE id = ?";

  connection.query(
    query,
    [Name, email, phone, req.params.id],
    (err, results) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

app.get("/delete/:id", (req, res) => {
  const query = "DELETE FROM users WHERE ID = ?";
  connection.query(query, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log(
    "server berjalan di port 3000, buka web melalui http://localhost:3000"
  );
});
