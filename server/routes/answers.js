const router = require('express').Router();
let Answer = require('../models/answers.model');
const moment = require('moment')
require('dotenv').config();
let Master = require('../models/master.model');

router.route('/add/' + process.env.API_KEY).post((req, res) => {
    var password = req.body.master;
    Master.findOne({ _id: "60dda1065c3dd0f969d5e042" }).then(answer => {
        if (answer.key === password) {
            console.log("OK");
            const answer = new Answer({
                questionid: req.body.qid,
                answer: req.body.answer,
                email: req.body.email,
                photo: req.body.photo,
                username: req.body.username,
                date: moment().utcOffset("+05:30").format('MMMM Do YYYY, h:mm:ss a')
            });
            answer.save().then(answers => res.json(answers))
                .catch(err => res.status(400).json('Error: ' + err));
        } else {
            res.json("Invalid")
        }
    });

});

router.route('/getans/' + process.env.API_KEY).post((req, res) => {
    var question_id = req.body.qid;
    var password = req.body.master;
    console.log(question_id)
    Master.findOne({ _id: "60dda1065c3dd0f969d5e042" }).then(answer => {
        if (answer.key === password) {
            console.log("OK");
            Answer.find({ questionid: question_id })
                .then(answers => res.json(answers))
                .catch(err => res.status(400).json('Error: ' + err));
        } else {
            res.json("Invalid")
        }
    });
});


module.exports = router;