const express = require("express");
const Book = require("../models/Book");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const checkIfAutheticated = require("../middleware/auth");

router.get("/get-books", async (req, res) => {
  try {
    const books = await Book.find({ isDeleted: false });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post(
  "/create-book",
  [
    check("name").not().isEmpty(),
    check("authorName").not().isEmpty(),
    check("isbn").not().isEmpty(),
    check("shortDescription").not().isEmpty(),
    check("pagesNumber").not().isEmpty(),
    check("price").not().isEmpty(),
    check("loanPrice").not().isEmpty(),
    check("publisher").not().isEmpty(),
    check("pictureUrl").not().isEmpty(),
    check("isNew").not().isEmpty(),
    check("lagerCount").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const {
      name,
      authorName,
      isbn,
      shortDescription,
      pagesNumber,
      price,
      loanPrice,
      publisher,
      pictureUrl,
      isNew,
      lagerCount,
    } = req.body;

    try {
      const newBook = new Book({
        name,
        authorName,
        isbn,
        shortDescription,
        pagesNumber,
        price,
        loanPrice,
        publisher,
        pictureUrl,
        isNew,
        lagerCount,
        isbn: "123456789",
        isDeleted: false,
      });

      const result = await newBook.save();

      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Somehting went wrong" });
    }
  }
);

router.get("/get-book/:id", async (req, res) => {
  try {
    const singleBook = await Book.findById(req.params.id);
    if (!singleBook) {
      return res.status(400).json({ error: "No such book" });
    }
    res.json(singleBook);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post(
  "/update-book/:id",
  [
    check("name").not().isEmpty(),
    check("authorName").not().isEmpty(),
    check("isbn").not().isEmpty(),
    check("shortDescription").not().isEmpty(),
    check("pagesNumber").not().isEmpty(),
    check("price").not().isEmpty(),
    check("loanPrice").not().isEmpty(),
    check("publisher").not().isEmpty(),
    check("lagerCount").not().isEmpty(),
    check("isNew").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const {
      name,
      authorName,
      isbn,
      shortDescription,
      pagesNumber,
      price,
      loanPrice,
      publisher,
      lagerCount,
      isNew,
    } = req.body;

    let pictureStuff;
    if (req.body?.pictureUrl) {
      pictureStuff = req.body.pictureUrl;
    }

    try {
      const singleBook = await Book.findByIdAndUpdate(
        req.params.id,
        {
          name,
          authorName,
          isbn,
          shortDescription,
          pagesNumber,
          price,
          loanPrice,
          publisher,
          lagerCount,
          isNew,
        },
        { new: true }
      );

      if (pictureStuff) {
        await Book.findByIdAndUpdate(req.params.id, {
          pictureUrl: pictureStuff,
        });
      }

      if (!singleBook) {
        return res.status(400).json({ error: "No such book" });
      }
      res.json({ message: "Book updated" });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

router.delete("/delete-book/:id", async (req, res) => {
  try {
    const singleBook = await Book.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });
    if (!singleBook) {
      return res.status(400).json({ error: "No such book" });
    }
    const newData = await Book.find({ isDeleted: false });
    res.json(newData);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
