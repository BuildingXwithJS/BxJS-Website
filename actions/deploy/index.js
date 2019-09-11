const core = require('@actions/core');
const {exec} = require('child_process');

try {
  const endpoint = core.getInput('endpoint');
  const token = core.getInput('token');
  const child = exec(
    `npx exoframe -u -e ${endpoint} -t $TOKEN`,
    {
      env: {...process.env, TOKEN: token},
    },
    error => {
      if (error) {
        throw error;
      }
    }
  );
} catch (error) {
  core.setFailed(error.message);
}
