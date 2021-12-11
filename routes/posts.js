const express = require("express");
const router = express.Router();
// import database
const connection = require("../config/database");
// validator
const { body, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM posts ORDER BY id desc", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "list data Posts",
        data: rows,
      });
    }
  });
});

// insert
router.post(
  "/store",
  [
    // validasi
    body("title").notEmpty().withMessage("Title tidak boleh kosong"),
    body("description")
      .notEmpty()
      .withMessage("Description tidak boleh kosong"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // define formdata
    let formData = {
      title: req.body.title,
      description: req.body.description,
    };

    // insert query
    connection.query("INSERT INTO posts SET ?", formData, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: err,
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Insert Data Successfully",
          data: rows[0],
        });
      }
    });
  }
);

// post detil
router.get("/:id", (req, res) => {
  const id = req.params.id;

  connection.query(`SELECT * FROM posts WHERE id=${id}`, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err,
      });
    }

    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: "Data Post tidak ditemukan!",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "data post",
        data: rows[0],
      });
    }
  });
});

module.exports = router;
