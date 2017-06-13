var jetpack = require('fs-jetpack'),
    path = require('path'),
    sass = require('node-sass'),
    maxmin = require('maxmin'),
    colors = require('colors'),
    jsonImporter = require('node-sass-json-importer'),
    pkg = require('../package.json');

const resolve = file => path.resolve(__dirname, file);
const cssFile = resolve('../dist/app.css');

console.log('cssFile', cssFile);

const banner = jetpack.read('build/banner.js')
  .replace('${name}', pkg.name)
  .replace('${version}', pkg.version)
  .replace('${time}', new Date());

sass.render({
  file: 'src/css/app.scss',
  outputStyle: 'compressed',
  importer: jsonImporter
}, (err, result) => {
  if (err) throw err.message;

  const size = maxmin(result.css, result.css, true);
  const asset = path.basename(cssFile);
  console.log(colors.green.bold(
    `\nWritten: ${asset}
    \nSize: ${size.substr(size.indexOf(' → ') + 3)}
    \nNow: ${new Date()}\n`
  ));

  jetpack.write(cssFile, banner + result.css);
});
