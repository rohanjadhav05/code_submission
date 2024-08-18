const problemService = require('../service/problemService');

const getAll = async (req, res) => {
    try{
        const results = await problemService.getProblemList();
        res.status(200).json(results);
    }
    catch(err){
        console.error('Error fetching data  : ',err.stack);
        res.status(500).json({ error: 'Database query error' });
    }
}

const getProblem = async (req, res) => {
    const problemId = req.params.id;
    try{
        const results = await problemService.getProblemById(problemId);
       res.status(200).json(results);
    }
    catch(err){
        console.error('Error Fetching data : ', err.stack);
        res.status(500).json({ error: 'Database query error' });
    }
}

const runUserCode = async(req, res) => {
    const problem_id = req.body.id;
    const codeId = req.body.codeId;
    const userCode = req.body.userCode;

    console.log("problemId : "+problem_id+" codeId : "+codeId+" /nuserCode : "+userCode);

    // yet to right;
}

module.exports = {
    getProblem,
    getAll,
    runUserCode,
}