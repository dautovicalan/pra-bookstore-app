const express = require("express");
const Book = require("../models/Book");
const router = express.Router();
//GET api/books

const BookPurchase = require("../models/BookPurchase");
const { check, validationResult } = require("express-validator");
const checkIfAutheticated = require("../middleware/auth");

var nodemailer = require("nodemailer");
const BookLoan = require("../models/BookLoan");
const Customer = require("../models/Customer");
const BookstoreInfo = require("../models/BookstoreInfo");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  service: "outlook", // service name
  secureConnection: false,
  tls: {
    ciphers: "SSLv3", // tls version
  },
  port: 587, // port
  auth: {
    user: "praproject2022@outlook.com",
    pass: "ilovepra2022",
  },
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({ isDeleted: false });
    res.json(books);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//GET api/books/:id
router.get("/:id", async (req, res) => {
  try {
    const singleBook = await Book.findById(req.params.id);
    if (!singleBook) {
      console.log("error with id");
      return res
        .status(400)
        .json({ msg: "Book with given Id does not exists" });
    }

    console.log(singleBook);

    res.json(singleBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post(
  "/create-purchase",
  [
    check("userUid", "Please provide Uid").not().isEmpty(),
    check("bookId", "Please provide bookId").not().isEmpty(),
    check("price", "Provide price").not().isEmpty(),
    check("purchaseType", "Provide type").not().isEmpty(),
    check("userEmail", "Provide email").not().isEmpty(),
    checkIfAutheticated,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { userUid, bookId, price, userEmail, purchaseType } = req.body;

    try {
      const customer = await Customer.findOne({ userUid });
      const purchase = new BookPurchase({
        userUid,
        user: customer._id,
        bookId,
        price,
        purchaseType,
      });

      const createdPurchase = await purchase.save();
      const purchasedBook = await Book.findById(bookId);

      await Book.findByIdAndUpdate(bookId, {
        lagerCount: purchasedBook.lagerCount - 1,
      });

      const bookstoreInfo = await BookstoreInfo.find();

      const mailData = {
        from: "praproject2022@outlook.com",
        to: userEmail,
        subject: "Purchase of a book",
        text: "Thank you for your purchase",
        html: `<b>Purchase Info</b><br>
        <div>
          <p>Purchase date: ${createdPurchase.purchaseDate}</p>
          <br><p>Price: ${createdPurchase.price}</p><br>
          <p>Book: ${purchasedBook.name}</p><br>
          <p>Purchase type: ${createdPurchase.purchaseType}</p><br>
          <address>
            Ime Knjizare: ${bookstoreInfo[0].name}<br>
            Ulica: ${bookstoreInfo[0].street}<br>
            Postanski broj: ${bookstoreInfo[0].postNumber}<br>
            Grad: ${bookstoreInfo[0].city}<br>
            IBAN: ${bookstoreInfo[0].iban}<br>
            OIB: ${bookstoreInfo[0].oib}<br>
          </address>
        </div>`,
      };

      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          return console.log(error);
        }
        res.json({ message: "Purchase mail sent" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }
);

router.post(
  "/purchased-books",
  [check("userUid", "Please provide Uid").not().isEmpty(), checkIfAutheticated],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { userUid } = req.body;

    try {
      const purchasedBooks = await BookPurchase.find({ userUid }).populate(
        "bookId"
      );

      if (!purchasedBooks) {
        return res.status(400).json({ error: "No books from this customer" });
      }

      res.json(purchasedBooks);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }
);

router.post(
  "/create-loan",
  [
    check("userUid", "Please provide Uid").not().isEmpty(),
    check("bookId", "Please provide bookId").not().isEmpty(),
    check("loanDuration", "Provide price").not().isEmpty(),
    check("userEmail", "Provide email").not().isEmpty(),
    check("loanPrice").not().isEmpty(),
    check("purchaseType", "Provide type").not().isEmpty(),
    checkIfAutheticated,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const {
      userUid,
      bookId,
      userEmail,
      loanDuration,
      loanPrice,
      purchaseType,
    } = req.body;

    if ((await BookLoan.count({ userUid: userUid })) >= 3) {
      return res
        .status(400)
        .json({ error: "Ne mozete imati vise od 3 posudbe" });
    }

    try {
      const customer = await Customer.findOne({ userUid });

      const loan = new BookLoan({
        userUid,
        user: customer._id,
        bookId,
        loanDuration,
        loanDateStart: Date.now(),
        loanDateEnd: weekDateAdder(loanDuration),
        loanPrice,
        purchaseType,
      });

      const createdLoan = await loan.save();
      const loanedBook = await Book.findById(bookId);

      await Book.findByIdAndUpdate(bookId, {
        lagerCount: loanedBook.lagerCount - 1,
      });

      const bookstoreInfo = await BookstoreInfo.find();

      const mailData = {
        from: "praproject2022@outlook.com",
        to: userEmail,
        subject: "Loan of a book",
        text: "Thank you for your purchase",
        html: `<b>Loan Info</b><br>
        <div>
          <p>Loan date: ${createdLoan.loanDateStart}</p>
          <br><p>Loan duration: ${createdLoan.loanDuration}</p><br>
          <p>Book: ${loanedBook.name}</p><br>
          <p>Loan end: ${createdLoan.loanDateEnd}</p><br>
          <p>Loan Price: ${createdLoan.loanPrice}</p>
          <p>Purchase Type: ${createdLoan.purchaseType}</p>
          <address>
            Ime Knjizare: ${bookstoreInfo[0].name}<br>
            Ulica: ${bookstoreInfo[0].street}<br>
            Postanski broj: ${bookstoreInfo[0].postNumber}<br>
            Grad: ${bookstoreInfo[0].city}<br>
            IBAN: ${bookstoreInfo[0].iban}<br>
            OIB: ${bookstoreInfo[0].oib}<br>
          </address>
        </div>`,
      };

      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          return res.status(500).json({ error: error });
        }
        res.json({ message: "Purchase mail sent" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }
);

router.post(
  "/loaned-books",
  [check("userUid", "Please provide Uid").not().isEmpty(), checkIfAutheticated],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { userUid } = req.body;

    try {
      const loanedBooks = await BookLoan.find({ userUid }).populate("bookId");

      if (!loanedBooks) {
        return res.status(400).json({ error: "No books from this customer" });
      }

      res.json(loanedBooks);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }
);

const weekDateAdder = (numberOfWeeks) => {
  const dt = new Date();
  dt.setDate(dt.getDate() + numberOfWeeks * 7);
  return dt;
};

module.exports = router;
