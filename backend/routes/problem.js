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
    const queryStr = `select p.id, 
                             p.name, 
                             p.description, 
                             p.constraints,
                             p.difficulty, 
                             p.topic,
                             c.starter_code as starterCode
                          from problem p
                            JOIN code c
                          ON p.id = c.problem_id
                            where p.id = ?`;

    connection.query(queryStr, [problemId], (err, results) => {
      if (err) {
        console.error('Error fetching data:', err.stack);
        return res.status(500).json({ error: 'Database query error' });
      }
      res.status(200).json(results);
    });
});

router.post('/userRun', (req,res) => {
  const body = req.body;
  console.log(body);
  console.log("-----------------------");
  console.log(body.userCode);
  res.status(200).json("Sample Vishay");
})
module.exports = router;
