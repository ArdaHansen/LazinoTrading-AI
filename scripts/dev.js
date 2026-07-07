const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function runProcess(name, args) {
  const child = spawn(npmCommand, args, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`${name} exited with code ${code}`);
      process.exit(code);
    }
  });

  return child;
}

const backend = runProcess('backend', ['run', 'dev', '-w', 'backend']);
const frontend = runProcess('frontend', ['run', 'dev', '-w', 'frontend']);

function stopAll() {
  [backend, frontend].forEach((child) => {
    if (child && !child.killed) {
      child.kill('SIGTERM');
    }
  });
}

process.on('SIGINT', () => {
  stopAll();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopAll();
  process.exit(0);
});
