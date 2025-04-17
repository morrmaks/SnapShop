import * as path from 'path';
import url from "url";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default function buildDevServer() {
  return { //настройки локального сервера
    static: path.resolve(__dirname,'./dist'), //к чему подключен локальный сервер
    // host: '0.0.0.0',
    port: 8000,
    // allowedHosts: 'all',
    compress: true, //сжатие файлов
    hot: true, //включен режим HMR
    open: true, //автоматическое открытие страницы в браузере после вызова скрипта
    watchFiles: ['src/pages/*.html'], //для обновления HTML в HMR режиме
    client: {
      overlay: false, // отключает оверлей с ошибками
    },
  }
};
