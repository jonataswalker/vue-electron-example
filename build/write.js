const path = require('path');
const maxmin = require('maxmin');
const colors = require('colors');
const jetpack = require('fs-jetpack');
const resolve = file => path.resolve(__dirname, file);

const isProduction = process.env.NODE_ENV === 'production';
const isBrowser = process.env.BROWSER === 'true';

const jsFile = resolve('../dist/deps.js');
const htmlTemplate = resolve('../src/index.template.html');
const htmlFile = resolve('../app/index.html');

const htmlPath = isBrowser ? '/static' : '../dist';
const html = jetpack
  .read(htmlTemplate)
  .replace(/{path}/g, htmlPath);
jetpack.write(htmlFile, html);

const depsDev = [
  resolve('../node_modules/vue/dist/vue.runtime.js'),
  resolve('../node_modules/vue-router/dist/vue-router.js')
];

const depsProd = [
  resolve('../node_modules/vue/dist/vue.runtime.min.js'),
  resolve('../node_modules/vue-router/dist/vue-router.min.js')
];

jetpack.remove(jsFile);
isProduction ? concat(depsProd, jsFile) : concat(depsDev, jsFile);

function concat(files, final) {
  let code = '';
  files.forEach(each => {
    code += jetpack.read(each);
  });

  jetpack.write(final, code);
  const asset = path.basename(final);
  const size = maxmin(code, code, true);

  console.log(colors.green.bold(
    `\nWritten: ${asset}
    \nSize: ${size.substr(size.indexOf(' → ') + 3)}
    \nNow: ${new Date()}\n`
  ));
}
