// routes/problems.js
const express = require('express');
const router = express.Router();
const connection = require('../src/db');


// GET request to retrieve data from the problems table
router.get('/getAll', (req, res) => {
  const queryStr = 'select id, name as title, difficulty, topic as category from problem';

  connection.query(queryStr, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json(results);
  });
});

router.get('/getProblemById/:id', (req, res) => {
    const problemId = req.params.id;
    const queryStr = 'select id, name as title, description as problemStatement , constraints as constraints from problem where id = ?';
    console.log("inside the get Problem by id function");
    connection.query(queryStr, [problemId], (err, results) => {
      if (err) {
        console.error('Error fetching data:', err.stack);
        return res.status(500).json({ error: 'Database query error' });
      }
      res.status(200).json(results);
    });
  });

module.exports = router;
