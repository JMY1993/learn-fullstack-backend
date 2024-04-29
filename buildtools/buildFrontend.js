const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const fse = require('fs-extra');

const configFilename = process.argv[2];
const config = require(configFilename);

config.frontend.forEach(project => {
  const projectPath = path.resolve(__dirname, project.path);
  const buildScript = project.script || 'npm run build';
  const distPath = path.join(projectPath, project.dist || 'dist');
  const targetPath = path.resolve(__dirname, project.target || 'dist');

  console.log(`Running ${buildScript} in ${projectPath}`);
  execSync(buildScript, { cwd: projectPath, stdio: 'inherit' });

  if (fs.existsSync(distPath)) {
    fse.copySync(distPath, targetPath);
    console.log(`Copied dist folder to ${targetPath}`);
  }

  if (project.cleanup) {
    console.log(`Running cleanup script: ${project.cleanup}`);
    execSync(project.cleanup, { cwd: projectPath, stdio: 'inherit' });
  }
});