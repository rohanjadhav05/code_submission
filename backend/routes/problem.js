// routes/problems.js
const express = require('express');
const router = express.Router();
const connection = require('../src/db');
const { run_java_code } = require('../run_codes/java/run_code');


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
  const { id,userCode} = req.body
  const queryStr = `select base_code from code where id = ?`;
  connection.query(queryStr, [id], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      return res.status(500).json({ error: 'Database query error' });
    }else{
      const base_code = "public class Main {public static void main(String[] args) { Solution s = new Solution();int[] bills = new int[5]; s.lemonadeChange(bills);}}";
      console.log(base_code)
      console.log(userCode)
      run_java_code(base_code, userCode, [{name: 'my_code'}])
    }
    res.status(200).json(results);
  });
 
})
module.exports = router;


"public class Main {public static void main(String[] args) { Solution s = new Solution(); s.lemonadeChange(bills);}}"