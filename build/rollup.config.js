import { readFileSync } from 'fs';
import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import bundleSize from 'rollup-plugin-bundle-size';
import vue from 'rollup-plugin-vue';
import colors from 'colors';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const external = Object.keys(pkg.dependencies).concat(['fs', 'path']);

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const isBrowser = process.env.BROWSER || false;

const dest = isBrowser
  ? isProduction
    ? `dist/app.min.js`
    : `dist/app.js`
  : `dist/server.js`;

const paths = [
  'src/components',
  'src/views',
  'src/helpers',
  '' // to include konstants
];

const extensions = ['.js', '.vue'];

const browserPlugins = [
  bundleSize(),
  includePaths({ paths, extensions }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  vue({ compileTemplate: true }),
  commonjs(),
  resolve({ extensions: ['.js', '.vue'] }),
  buble({ target: { chrome: 50 }})
];

const serverPlugins = [
  bundleSize(),
  includePaths({ paths, extensions }),
  commonjs({ include: 'node_modules/**' }),
  resolve()
];

const banner = readFileSync('build/banner.js', 'utf-8')
  .replace('${name}', pkg.name)
  .replace('${version}', pkg.version)
  .replace('${time}', new Date());

colors.setTheme({ custom: ['green', 'bgWhite'] });
console.log(colors.green.bold(
  `\nRunning Rollup in ${env} mode on ${isBrowser ? 'browser' : 'server'}
  \nBundle: ${dest}
  \nNow: ${new Date()}\n`
));

const globals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter'
};

export default {
  external,
  banner,
  dest,
  globals,
  entry: isBrowser ? 'src/entry.js' : 'server/index.js',
  format: isBrowser ? 'umd' : 'cjs',
  plugins: isBrowser ? browserPlugins : serverPlugins
};
