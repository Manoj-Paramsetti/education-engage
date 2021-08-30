const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

var corsOptions = {
    origin: 'https://educationengage.vercel.app',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const answerRouter = require('./routes/answers');
const questionRouter = require('./routes/question');

app.use('/answer', answerRouter);
app.use('/question', questionRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});