import {dirname} from 'path';
import {fileURLToPath} from 'url';


// DIY __dirname since it's removed from ES Modules:
// https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/
export function getDirName(meta: any) {
    const __filename = fileURLToPath(meta.url);

    return dirname(__filename);
}
