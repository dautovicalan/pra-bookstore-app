const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const admin = require("../admin/admin");
const checkIfAutheticated = require("../middleware/auth");

const Customer = require("../models/Customer");

var nodemailer = require("nodemailer");

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

// @route POST api/customer/create
// Koristi za kreiranje user-a
router.post(
  "/create",
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Please include valid email").not().isEmpty(),
    check("password", "Please include password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { firstName, lastName, email, password } = req.body;
    try {
      const user = await admin.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
      });

      const currentDate = new Date();
      const customerMongo = new Customer({
        userUid: user.uid,
        bookStoreId: `K${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDate()}${pad(
          await Customer.count()
        )}`,
      });

      await customerMongo.save();

      return res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  }
);

function pad(num) {
  var string = "" + num;
  var pad = "0000";
  n = pad.substring(0, pad.length - string.length) + string;
  num++;
  return n;
}

router.post(
  "/getCustomer",
  [check("userUid", "Please login").not().isEmpty(), checkIfAutheticated],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { userUid } = req.body;
    try {
      let customer = await Customer.findOne({ userUid });
      if (!customer) {
        return res.status(400).json({ error: "Login failed" });
      }

      return res.json(customer);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/updateCustomerAddress",
  [
    check("userUid", "Please provide Uid").not().isEmpty(),
    check("streetAddress", "Please provide address").not().isEmpty(),
    check("postNumber", "Please provide post number").not().isEmpty(),
    check("cityName", "Please provide city name").not().isEmpty(),
    checkIfAutheticated,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { userUid, streetAddress, postNumber, cityName } = req.body;
    try {
      let customer = await Customer.findOneAndUpdate(
        { userUid },
        { streetAddress, postNumber, cityName }
      );
      if (!customer) {
        return res.status(400).json({ error: "Login failed" });
      }
      customer = await Customer.findOne({ userUid });
      if (!customer) {
        return res.status(400).json({ error: "Something went wrong" });
      }
      res.json(customer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.put(
  "/deleteCustomer",
  [
    check("userUid", "Please provide Uid").not().isEmpty(),
    check("userEmail", "Please provide Uid").not().isEmpty(),
    checkIfAutheticated,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { userUid, userEmail } = req.body;
    try {
      await admin.auth().updateUser(userUid, {
        displayName: `${generateRandomText(10)} ${generateRandomText(10)}`,
        disabled: true,
      });

      const customer = await Customer.findOneAndUpdate(
        { userUid },
        {
          streetAddress: generateRandomText(10),
          postNumber: generateRandomText(10),
          cityName: generateRandomText(10),
        }
      );

      if (!customer) {
        return res.status(400).json({ error: "Deleting failed" });
      }

      const mailData = {
        from: "praproject2022@outlook.com",
        to: userEmail,
        subject: "Accout Deleted",
        text: "You deleted your account",
      };

      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          return console.log(error);
        }
        res.json({ message: "Succefully deleted account" });
      });
    } catch (error) {
      console.log("Error in catch");
      return res.status(500).json({ error: error.message });
    }
  }
);

function generateRandomText(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = router;
