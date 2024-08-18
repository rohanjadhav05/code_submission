const { run_java_code } = require('../run_codes/java/run_code');
const {getProblemList, getProblemById, base_code_with_laonguage, max_time_and_memory, get_test_cases} = require('../service/problemService');

const getAll = async (req, res) => {
    try{
        const results = await getProblemList();
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
        const results = await getProblemById(problemId);
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
    const { language, base_code} = await base_code_with_laonguage(codeId)
    const { max_memory, timeout_sec} = await max_time_and_memory(problem_id)
    const test_cases = await get_test_cases(problem_id)
    let result = {}
    if(language == 'java')
      result = await run_java_code(base_code, userCode, test_cases, max_memory, timeout_sec)
    res.status(200).json(result);
}

module.exports = {
    getProblem,
    getAll,
    runUserCode,
}