import * as path from 'path';
import url from "url";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default  function buildResolvers() {
  return {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  }
}
