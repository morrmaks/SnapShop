import * as path from 'path';
import url from "url";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default function buildPlugins(isProd: boolean) {
  return [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/pages/index.html'),
        favicon: path.resolve(__dirname, '../src/public/SnapShop-favicon-200.png'),
      }),
      isProd && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css', //в отдельную папку
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      new CleanWebpackPlugin(),
      new Dotenv(),
    ].filter(Boolean)
};
