var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const { check, validationResult } = require('express-validator');
const mysql = require('mysql2/promise');
const databaseConfig = require('./config/database.js');
const pool = mysql.createPool({
   host: databaseConfig.host,
   user: databaseConfig.user,
   password: databaseConfig.password,
   database: databaseConfig.database,
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
});

require('dotenv').config();

app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Get all Data
app.get('/', async function (req, res) {
   var result = [];
   try {
      result = await pool.query(
         'SELECT * FROM personal_data'
      );
   }
   catch(err) {
      return res.status(400).json({ error: true, message: "Gagal mengambil data!" });
   }
   
   return res.status(200).json({ error: false, data: result[0] });
});

// Insert data
app.post('/insert', [
      check('nim', "NIM harus diisi!").exists(),
      check('fullname', "Nama lengkap harus diisi!").exists(),
      check('birthdate', "Tanggal lahir harus diisi!").exists(),
      check('nim', "NIM hanya dapat berisi nomor!").isNumeric(),
      check('nim', "NIM terlalu pendek!").isLength({ min: 8 }),
      check('nim', "NIM terlalu panjang!").isLength({ max: 20 }),
      check('fullname', "Nama Lengkap terlalu pendek!").isLength({ min: 2 }),
      check('fullname', "Nama Lengkap terlalu panjang!").isLength({ max: 240 }),
      check('birthdate', "Tanggal lahir tidak sesuai!").isISO8601().toDate()
   ], 
   async function (req, res) {
      const result = validationResult(req);
      const hasErrors = !result.isEmpty();
      if(hasErrors) {
         return res.status(400).json({ error: true, message: result.array()[0].msg });
      }

      var nim = req.body.nim
      var fullname = req.body.fullname
      var birthdate = req.body.birthdate
      try {
         await pool.execute(
            'INSERT INTO personal_data SET nim = ?, fullname = ?, birthdate = ?',
            [ nim, fullname, birthdate ]
         );
      }
      catch(err) {
         if(err.code == "ER_DUP_ENTRY") {
            return res.status(400).json({ error: true, message: "NIM sudah terdaftar!" });
         }
         return res.status(400).json({ error: true, message: "" });
      }
      
      return res.status(200).json({ error: false, message: "Data berhasil dimasukkan!" });
});

// Get one Data
app.get('/user/:nim', async function (req, res) {
   var result = [];
   try {
      result = await pool.query(
         'SELECT * FROM personal_data WHERE nim = ? LIMIT 1',
         [req.params.nim]
      );
   }
   catch(err) {
      return res.status(400).json({ error: true, message: "Gagal mengambil data!" });
   }
   
   return res.status(200).json({ error: false, data: result[0] });
});

// Delete one Data
app.delete('/user/:nim', async function (req, res) {
   var result = [];
   try {
      result = await pool.query(
         'DELETE FROM personal_data WHERE nim = ?',
         [req.params.nim]
      );
   }
   catch(err) {
      return res.status(400).json({ error: true, message: "Gagal menghapus data!" });
   }
   if(result[0].affectedRows == 0) {
      return res.status(400).json({ error: true, message: "Data tidak ditemukan!" });
   }

   return res.status(200).json({ error: false, message: "Data berhasil dihapus!" });
});

// Edit one Data
app.put('/user/:nim', [
   check('nim', "NIM harus diisi!").exists(),
   check('fullname', "Nama lengkap harus diisi!").exists(),
   check('birthdate', "Tanggal lahir harus diisi!").exists(),
   check('nim', "NIM hanya dapat berisi nomor!").isNumeric(),
   check('nim', "NIM terlalu pendek!").isLength({ min: 8 }),
   check('nim', "NIM terlalu panjang!").isLength({ max: 20 }),
   check('fullname', "Nama Lengkap terlalu pendek!").isLength({ min: 2 }),
   check('fullname', "Nama Lengkap terlalu panjang!").isLength({ max: 240 }),
   check('birthdate', "Tanggal lahir tidak sesuai!").isISO8601().toDate()
], 
async function (req, res) {
   const validateResult = validationResult(req);
   const hasErrors = !validateResult.isEmpty();
   if(hasErrors) {
      return res.status(400).json({ error: true, message: validateResult.array()[0].msg });
   }
   var result = [];
   var nim = req.params.nim
   var fullname = req.body.fullname
   var birthdate = req.body.birthdate
   try {
      result = await pool.execute(
         'UPDATE personal_data SET fullname = ?, birthdate = ? WHERE nim = ?',
         [ fullname, birthdate, nim ]
      );
   }
   catch(err) {
      return res.status(400).json({ error: true, message: "" });
   }
   if(result[0].affectedRows == 0) {
      return res.status(400).json({ error: true, message: "Data tidak ditemukan!" });
   }
   return res.status(200).json({ error: false, message: "Data berhasil diubah!" });
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Backend app listening at http://%s:%s", host, port)
})