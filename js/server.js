const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
    .connect("mongodb://localhost:27017/quizApp", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));

// Define Question Schema and Model
const questionSchema = new mongoose.Schema({
    category: String,
    quizId: String,
    question: String,
    options: [String],
    correctOption: Number,
});

const Question = mongoose.model("Question", questionSchema);

// Routes
app.get("/api/questions/:quizId", async (req, res) => {
    try {
        const questions = await Question.find({ quizId: req.params.quizId });
        res.json(questions);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:27017/quizApp`));
