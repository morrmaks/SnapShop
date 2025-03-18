import * as path from 'path';
import url from "url";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
export default function buildResolvers() {
    return {
        alias: {
        // '@components': path.resolve(__dirname, '../src/components/'),
        // '@utils': path.resolve(__dirname, '../src/utils/'),
        },
        extensions: ['ts', 'tsx', '.js', '.jsx', '.json']
    };
}
