// routes/problems.js
const express = require('express');
const router = express.Router();
const problemController = require('../controller/problemController');


// GET request to retrieve all problems from the problems table
router.get('/getAll', problemController.getAll);

// GET request to retrieve problems by id from the problems table
router.get('/getProblemById/:id', problemController.getProblem);

// POST method to run the code in container
router.post('/userRun', problemController.runUserCode)

// POST method to get baseCode by laguage
router.get("/getBaseCode", problemController.getBaseCodeByLanguage);

router.get('/lang/:id', problemController.languageCollection);

module.exports = router;
