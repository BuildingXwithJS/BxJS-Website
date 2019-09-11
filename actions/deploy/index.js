const core = require('@actions/core');
const github = require('@actions/github');
const {spawn} = require('child_process');

try {
  const endpoint = core.getInput('endpoint');
  const token = core.getInput('token');
  const child = spawn('npx', ['exoframe', '-u', `-e ${endpoint}`, `-t $TOKEN`], {
    env: {TOKEN: token},
  });
  let stdout = '';
  let stderr = '';
  child.stdout &&
    child.stdout.on('data', d => {
      stdout += d;
    });
  child.stderr &&
    child.stderr.on('data', d => {
      stderr += d;
    });
  child.on('error', e => {
    throw e;
  });
  child.on('close', code => {
    if (code) {
      const err = new Error(require('./y.js')`Command failed: ${cmd} ${args.join(' ')}`);
      err.isOperational = true;
      err.stderr = stderr;
      err.exitCode = code;
      throw error;
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
