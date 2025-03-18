import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const stylesHandler = MiniCssExtractPlugin.loader;

export default function buildLoaders(isDev: boolean) {
  return [
    {
      test: /\.(ts|tsx)$/i,
      use: ['babel-loader', 'ts-loader'],
      exclude: '/node_modules/', //папка исключение
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        isDev ? 'style-loader' : stylesHandler, //извлекает css в отдельный файл
        'css-loader', //преобразует css в js
        'postcss-loader', //добавляет вендорные префиксы
        'resolve-url-loader', //исправляет пути к ресурсам в css
        {
          loader: 'sass-loader', //компилирует scss в css
          options: {
            sourceMap: true,
            sassOptions: {
              includePaths: ['src/scss'], //путь к scss файлам
              quietDeps: true,
            }
          }
        }
      ]
    },
    {
      test: /\.сss$/i,
      use: [
        isDev ? 'style-loader' : stylesHandler,
        'css-loader',
        'postcss-loader'
      ]
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/i,
      type: 'asset/resource',
    },
  ]
};
