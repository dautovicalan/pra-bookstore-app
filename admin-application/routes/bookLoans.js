const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const checkIfAutheticated = require("../middleware/auth");
const Book = require("../models/Book");

const BookLoan = require("../models/BookLoan");
const Customer = require("../models/Customer");

router.get("/get-loans", async (req, res) => {
  try {
    const loans = await BookLoan.find().populate("bookId").populate("user");
    res.json(loans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post(
  "/set-loan-returned",
  [check("reservationId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const {reservationId} = req.body;

    try {
        const newData = await BookLoan.findByIdAndDelete(reservationId).populate("bookId");
        const updateLagerCount = await Book.findByIdAndUpdate(newData.bookId, {lagerCount: newData.bookId.lagerCount + 1});
        const updatedCollection = await BookLoan.find().populate("bookId");
        res.json(updatedCollection);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Somehting went wrong"});
    }
  }
);

module.exports = router;
