const router = require('express').Router();
let Question = require('../models/questions.model');
const moment = require('moment')
require('dotenv').config();
let Master = require('../models/master.model');

router.route('/add/' + process.env.API_KEY).post((req, res) => {
    var password = req.body.master;
    Master.findOne({ _id: "60dda1065c3dd0f969d5e042" }).then(answer => {
        if (answer.key === password) {
            console.log("OK");
            const question = new Question({
                question: req.body.question,
                email: req.body.email,
                photo: req.body.photo,
                username: req.body.username,
                date: moment().utcOffset("+05:30").format('MMMM Do YYYY, h:mm:ss a')
            });
            question.save().then(questions => res.json(questions))
                .catch(err => res.status(400).json('Error: ' + err));
        } else {
            res.json("Invalid")
        }
    });
});

router.route('/get/' + process.env.API_KEY).post((req, res) => {
    var password = req.body.master;
    Master.findOne({ _id: "60dda1065c3dd0f969d5e042" }).then(answer => {
        if (answer.key === password) {
            console.log("OK");
            Question.find()
                .then(questions => res.json(questions))
                .catch(err => res.status(400).json('Error: ' + err));
        } else {
            res.json("Invalid")
        }
    });
});

router.route('/id/' + process.env.API_KEY).post((req, res) => {
    var password = req.body.master;
    Master.findOne({ _id: "60dda1065c3dd0f969d5e042" }).then(answer => {
        if (answer.key === password) {
            console.log("OK");
            Question.find({ _id: req.body.qid })
                .then(questions => res.json(questions))
                .catch(err => res.status(400).json('Error: ' + err));
        } else {
            res.json("Invalid")
        }
    });

});
module.exports = router;