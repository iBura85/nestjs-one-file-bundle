const path = require('path');
//const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

console.log('===== КОМПИЛЯЦИЯ NESTJS В ОДИН ФАЙЛ ======');

const outputFileName = "app-name.js"
const outputPath = path.resolve(__dirname, 'app');

module.exports = function (options) {

  // Название выходного файла
  options.output.filename = outputFileName;

  //  Директория в которую крмпилируется файл
  options.output.path = outputPath;

  // 
  options.target = 'node';

  // Здесь переопределяется повдеение webpack NestJS по умолчанию
  // именно здесь node_modules не влючаются в финальный бандл
  options.externals = [];

  options.plugins = [
    // Подключить все плагины webpack NestJS
    ...options.plugins,

    // Плагин для очистки
    new CleanWebpackPlugin(),

    // Здесь необходимо выключить модули которые не устанолены, иначи вебпак будет генерировать ошибку,
    // вроде в зпм используются все модули, так что попробуй все закоментить
    new webpack.IgnorePlugin(/@nestjs\/microservices/),
    // new webpack.IgnorePlugin(/@nestjs\/platform-express/),
    new webpack.IgnorePlugin(/@nestjs\/websockets\/socket-module/),
    new webpack.IgnorePlugin(/pg-native/),
  ];

  options.resolve = {
    ...options.resolve,
    // для использования путей из tsconfig
    plugins: [new TsconfigPathsPlugin({/* options: see below */})]
  }
};
