const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const checkIfAutheticated = require("../middleware/auth");

const BookPurchase = require("../models/BookPurchase");
const Customer = require("../models/Customer");

router.get("/get-purchases", async (req, res) => {
  try {
    const loans = await BookPurchase.find().populate("bookId").populate("user");
    res.json(loans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
