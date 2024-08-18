const connection = require('../db/db');

const getProblemList = () => {
    return new Promise((resolve, reject) => {
        const queryStr = `select id, 
                      name, 
                      difficulty, 
                      topic 
                    from problem`;

        connection.query(queryStr, (err, results) => {
            if(err){
                return reject(err);
            }
            resolve(results);
        })
    })


}

const getProblemById = (problemId) => {
    return new Promise((resolve, reject) => {
      const queryStr = `select p.id, 
                               p.name, 
                               p.description, 
                               p.constraints,
                               p.difficulty, 
                               p.topic,
                               c.starter_code as starterCode,
                               c.id as codeId,
                               t.isVisible,
                               t.input,
                               t.output,
                               t.explanation,
                               t.id as testCaseId
                            from problem p
                                JOIN code c
                              ON p.id = c.problem_id
                                JOIN testcase t
                              ON p.id = t.problem_id
                                  where p.id = ?
                                    and t.isVisible = 1`;
  
      connection.query(queryStr, [problemId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
};

module.exports = {
    getProblemList,
    getProblemById,
}