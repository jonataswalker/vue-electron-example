const path = require('path');
const { spawnSync } = require('child_process');
const { watch } = require('chokidar');
const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const isBrowser = process.env.BROWSER === 'true';
const jsBuild = isBrowser ? 'build:browser:dev' : 'build:electron:dev';
const write = isBrowser ? 'write:browser:dev' : 'write:electron:dev';

run('build:css');
run(jsBuild);
isBrowser && run('build:server:dev');

const resolve = file => path.resolve(__dirname, file);
const cwd = resolve('..');

const watcher1 = watch([
  'src/**/*.scss'
], { cwd }).on('change', () => run('build:css'));

const watcher2 = watch([
  'build/*.js',
  'src/**/*.js',
  'src/**/*.vue'
], { cwd }).on('change', () => run(jsBuild));

let serverWatcher;
if (isBrowser) {
  serverWatcher = watch([
    'build/*.js',
    'server/**/*.js'
  ], { cwd }).on('change', () => run('build:server:dev'));
}

const watcher4 = watch([
  'src/index.template.html'
], { cwd }).on('change', () => run(write));

process.on('SIGINT', function () {
  watcher1.close();
  watcher2.close();
  isBrowser && serverWatcher.close();
  watcher4.close();
});

function run(script) {
  const proc = spawnSync(cmd, ['run', script], { stdio: [0, 1, 2] });
  proc.error && console.log(proc.error);
}
