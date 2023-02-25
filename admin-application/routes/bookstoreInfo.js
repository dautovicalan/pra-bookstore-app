const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const checkIfAutheticated = require("../middleware/auth");

const BookstoreInfo = require("../models/BookstoreInfo");

router.post(
  "/update-infos",
  [
    check("name", "Please provide name").not().isEmpty(),
    check("street", "Please provide street").not().isEmpty(),
    check("postNumber", "Please provide postNumber").not().isEmpty(),
    check("city", "Please provide city").not().isEmpty(),
    check("iban", "Please provide iban").not().isEmpty(),
    check("oib", "Please provide oib").not().isEmpty(),
    check("id", "Please provide id").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, street, postNumber, city, iban, oib, id } = req.body;

    try {
      const updateBookstoreInfo = await BookstoreInfo.findByIdAndUpdate(
        id,
        {
          name,
          street,
          postNumber,
          city,
          iban,
          oib,
        },
        { new: true }
      );

      res.send(updateBookstoreInfo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

router.get(
  "/get-infos",
  async (req, res) => {    
    try {
        const result = await BookstoreInfo.find();
        res.json(result);
    } catch (error) {
        res.status(500).json({error: "Something went wrong"});
    }
  }
);

module.exports = router;
