const express = require("express");
const connectDB = require("./config/db");
const ImageKit = require("imagekit");

const app = express();

// Connect database

connectDB();

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/w9ea8djcn/",
  publicKey: "public_dwFW+ZSfUrtITQDROUNoJATDjH8=",
  privateKey: "private_w+ehqyrpVBf/Edxi/P63A/N1tvo=",
});

// Init middleware
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => res.send("API Runing"));

app.get("/auth", (req, res) => {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

//Routes
app.use("/api-admin/workers", require("./routes/workers"));
app.use("/api-admin/bookstore", require("./routes/bookstoreinfo"));
app.use("/api-admin/books", require("./routes/books"));
app.use("/api-admin/loans", require("./routes/bookLoans"));
app.use("/api-admin/purchases", require("./routes/bookPurchase"));

// Env variables and starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running"));
