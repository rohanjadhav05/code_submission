const Docker = require('dockerode');
const docker = new Docker();
const fs = require('fs');


async function startContainer(imageName , attach_path,  max_memory_in_mb = 10, ) {
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
          `${attach_path}:/usr/src/app` // Volume attachment
        ]
      }
    });
  
    await container.start();
    return container;
}

async function runCommandInContainer(container, command, env_array=[], timeout = 20) {
    const exec = await container.exec({
      Cmd: ['bash', '-c', command],
      AttachStdout: true,
      AttachStderr: true,
      Env: env_array
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

const get_test_result = async (output_file_path)=>{
    return fs.readFileSync(output_file_path, 'utf8');
}

const  handleType = (value) => {
    switch (typeof value) {
       case 'object':
            if (Array.isArray(value)) {
               return value.join(",");
            } else {
               return value;
            }
        default:
           return value
    }
}

const write_code_in_file = (filePath, output_file_path, content)=>{
   
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

    fs.truncate(output_file_path, 0, (err) => {
      if (err) {
        console.error('Error truncating output file:', err);
      }
    })   
}

const build_env_array = (testCase) =>{
    return Object.entries(testCase.input).map(([key, value]) => `${key}=${handleType(value)}`);
}

const build_command_with_output = (testCase, base_run_command)=>{
    outputs = testCase.output.map( val=> handleType(val)).join(" ");
    return `${base_run_command} ${outputs}`
}

async function runTestCases( imageName, testCases, container_attach_path, output_file_path, compile_command,  base_run_command,max_memory_in_mb = 10 , testCaseTimeout = 20) {
    let container;
  
    try {
      
      container = await startContainer(imageName, container_attach_path, max_memory_in_mb);
      await runCommandInContainer(container, compile_command);
    
      for (const testCase of testCases) {
        try{
            const output = await runCommandInContainer(container, build_command_with_output(testCase, base_run_command), build_env_array(testCase),testCaseTimeout); 
            console.log("output:"+output)
            const test_result = await get_test_result(output_file_path);
            if( test_result.length > 0 )
                return { status: 'error', error_type: 'output_mismatch', testCase: testCase, your_output: test_result }
            
        }catch (error) {
            return { status: 'error', error_type: 'run_time_error', error: error.message}
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
    return { status: 'sucess'}
}


module.exports = {
    runTestCases,
    write_code_in_file
}