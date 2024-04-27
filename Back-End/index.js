const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");

const { connectDB } = require("./db");

app.use(bodyParser.json())

app.use(cors());

connectDB();

app.get("/", (req, res) => {
    res.send("Server Working fine")
})

app.listen(4000, () => {
    console.log("Server started");
})


