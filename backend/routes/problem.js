// routes/problems.js
const express = require('express');
const router = express.Router();
const connection = require('../db/db');
const problemController = require('../controller/problemController');


// GET request to retrieve all problems from the problems table
router.get('/getAll', problemController.getAll);

// GET request to retrieve problems by id from the problems table
router.get('/getProblemById/:id', problemController.getProblem);

// POST method to run the code in container
router.post('/userRun', problemController.runUserCode)
module.exports = router;
