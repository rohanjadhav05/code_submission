const path = require('path');
const { runTestCases, write_code_in_file } = require('../utils');


const imageName = "java:3"
const basic_import = "import java.util.*;\nimport java.io.*;\n"

const main_file_path = path.resolve(__dirname, 'attach_volume/Main.java');
const output_file_path = path.resolve(__dirname, 'attach_volume/output.txt');
const attach_path = path.resolve(__dirname, 'attach_volume')

const compile_command  = 'javac Main.java';
const base_run_command = 'java Main'


const run_java_code = async (base_code, function_code, testCases, max_memory = 50, max_timeout = 20) => {
    const content = basic_import + function_code + base_code;
    write_code_in_file(main_file_path, output_file_path, content)
    const result = await runTestCases(imageName, testCases, attach_path, output_file_path, compile_command,  base_run_command, max_memory, max_timeout)
    return result;
}
  

module.exports = {
    run_java_code: run_java_code
};