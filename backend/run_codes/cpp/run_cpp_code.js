const path = require('path');
const { runTestCases, write_code_in_file } = require('../utils');


const imageName = "cpp:1"
const basic_import =  "#include <iostream>\n#include <sstream>\n#include <fstream>\n#include <cstdlib>\n#include <stdexcept>\n#include <vector>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n"

const main_file_path = path.resolve(__dirname, 'attach_volume/main.cpp');
const output_file_path = path.resolve(__dirname, 'attach_volume/output.txt');
const attach_path = path.resolve(__dirname, 'attach_volume')

const compile_command  = 'g++ -o run_cpp main.cpp';
const base_run_command = './run_cpp'


const run_cpp_code = async (base_code, function_code, testCases, max_memory = 50, max_timeout = 20) => {
    const content = basic_import + function_code + base_code 
    write_code_in_file(main_file_path, output_file_path, content)
    const result = await runTestCases(imageName, testCases, attach_path, output_file_path, compile_command,  base_run_command, max_memory, max_timeout)
    return result;
}
  

module.exports = {
    run_cpp_code
};


