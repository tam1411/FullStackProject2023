import { dirname } from 'path';
import { fileURLToPath } from 'url';

export function checkMiddlewareInputs(args) {
    let path = "*";
    let handler = null;

    if (args.length === 2) [path, handler] = args;
    else handler = args[0];

    if (typeof path !== "string")
        throw new Error("Path needs to be either a string");
    else if (typeof handler !== "function")
        throw new Error("Middleware needs to be a function");

    return {
        path,
        handler,
    };
}
// /admin/users/user3
export function matchPath(setupPath, currentPath) {
    const setupPathArray = setupPath.split("/");
    const currentPathArray = currentPath.split("/");

    let match = true;
    const params = {};

    for (let i = 0; i < setupPathArray.length; i++) {
        const route = setupPathArray[i];
        const path = currentPathArray[i];
        if (route[0] === ":") {
            params[route.substr(1)] = path;
        } else if (route === "*") {
            break;
        } else if (route !== path) {
            match = false;
            break;
        }
    }

    const isMatch = match ? { matched: true, params } : { matched: false };

    return isMatch;
}

// DIY __dirname since it's removed from ES Modules:
// https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/
export function getDirName(meta) {
    const __filename = fileURLToPath(meta.url);

    const __dirname = dirname(__filename);

    return __dirname;
}
