import * as path from 'path';
import * as url from 'url';
import buildPlugins from './build/buildPlugins.js';
import buildDevServer from './build/buildDevServer.js';
import buildLoaders from './build/buildLoaders.js';
import buildResolvers from './build/buildResolvers.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default (env: {mode: string}) => { //передает переменную окружения
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  return {
    entry: './src/index.js', //откуда строить зависимости
    output: {
      path: path.resolve(__dirname, 'dist'), //путь к папке, где собирать финальный бандл
      filename: '[name].[contenthash].js', //имя файла финального бандла
    },
    mode: env.mode ?? 'development', //если режим не задан, то режим разработки
    devtool: "source-map", //генерация исходных карт в devtools браузера
    devServer: buildDevServer(),
    module: {
      rules: buildLoaders(isDev),
    },
    ignoreWarnings: [/Global built-in functions are deprecated/],
    plugins: buildPlugins(isProd),
    resolve: buildResolvers(),
    optimization: {
      minimize: isProd
    }
  }
};
