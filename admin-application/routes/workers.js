const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const checkIfAutheticated = require("../middleware/auth");
const admin = require("../admin/admin");

const Worker = require("../models/Worker");

router.get(
    "/get-workers",
    async (req, res) => {        
      const result = await admin.auth().listUsers()
      console.log("Jello")      
      res.json(result);
    }
)

module.exports = router;