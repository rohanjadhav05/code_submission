const Docker = require('dockerode');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const docker = new Docker();
const express = require('express');

const filePath = path.resolve(__dirname, 'attach_volume/Main.java');
const imageName = "java:3"
const basic_import = "import java.util.*;\nimport java.io.*;\n"

async function startContainer(imageName , max_memory_in_mb = 10) {
  const container = await docker.createContainer({
    Image: imageName,
    Cmd: ['bash'], // Start the container with an interactive shell
    Tty: true,
    OpenStdin: true,
    StdinOnce: true,
    HostConfig: {
      StdinOpen: true,
      Memory: max_memory_in_mb * 1024 * 1024, // Memory limit in bytes (e.g., 512MB)
      MemorySwap: -1, // Set to -1 for unlimited swap
      Binds: [
        `${path.resolve(__dirname, 'attach_volume')}:/usr/src/app` // Volume attachment
      ]
    }
  });

  await container.start();
  return container;
}

async function runCommandInContainer(container, command, timeout = 20) {
    const exec = await container.exec({
      Cmd: ['bash', '-c', command],
      AttachStdout: true,
      AttachStderr: true
    });
    const stream =  await exec.start();

    return new Promise((resolve, reject) => {
        let std_data = ""
       

        stream.on('data', data => std_data= std_data + data.toString());
       

        let timeoutId = setTimeout(() => {
            reject(new Error(`timed out`));
        }, timeout * 1000);

        stream.on('end', async () => {
            clearTimeout(timeoutId);
            const {ExitCode}  = await exec.inspect();
            if (ExitCode != 0) {
               reject(new Error(std_data));
            }else 
              resolve(std_data);
        
        })

    })
    
    
}

const get_user_output = async ()=>{
    const filePath =  path.resolve(__dirname, 'attach_volume/output.text');
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });
    
    rl.once('line', (line) => {
      console.log('First line:', line);
      rl.close();
    });
}

const is_output_match = (expected_output) =>{

}

  
async function runTestCases( testCases, max_memory_in_mb = 10 , testCaseTimeout = 20) {
    let container;
  
    try {
      container = await startContainer(imageName, max_memory_in_mb);
      const result = await runCommandInContainer(container, 'javac Main.java');
    
      for (const testCase of testCases) {
        try{
            const result = await runCommandInContainer(container, `java Main`, testCaseTimeout); 
            
        }catch (error) {
            return { status: 'run', error_type: 'run_time_error', error: error.message}
        }
      } 
  
    } catch (error) {
      return { status: 'error', error_type: 'compile_time_error', error: error.message}
    } finally {
      if (container) {
        // Clean up the container
        await container.stop();
        await container.remove();
      }
    }
}

const write_code_in_file = (content)=>{
    console.log(filePath)
    fs.truncate(filePath, 0, (err) => {
        if (err) {
          console.error('Error truncating file:', err);
        } else {
          console.log('File has been truncated successfully.');
      
          fs.writeFile(filePath, content, (err) => {
            if (err) {
              console.error('Error writing file:', err);
            } else {
              console.log('File has been updated successfully.');
            }
          });
        }
      });
      
}

const run_java_code = async (base_code, function_code, testCases, max_memory = 50, max_timeout = 20) => {
    const content = basic_import + function_code + base_code;
    console.log(content)
    console.log(testCases)
    console.log(max_memory)
    console.log(max_timeout)
    // write_code_in_file(content)
    // const result = await runTestCases(testCases, max_memory, max_timeout);
    
    return result;
}
  

module.exports = {
    run_java_code: run_java_code
};