require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const app = express();


mongoose.connect(process.env.MONGODB_URI)
.then(() => app.listen(port, () => console.log("Server is running on port 5000")))
.catch((err) => console.log(err.message));


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const notesRouter = require("./routes/notes");
app.use("/", notesRouter);
