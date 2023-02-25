const express = require("express");
const connectDB = require("./config/db")

const app = express();

//DB Connection
connectDB();

app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));

//Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/customer", require("./routes/customer"));

//Enviroment variable later for horuku
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));