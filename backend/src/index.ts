import http from "http";
import * as dotenv from "dotenv";
dotenv.config();

import fs from "fs/promises";
import path from "path"

const server = http.createServer( async (req, res) => {

    const indexFile = await fs.readFile(path.resolve(__dirname, 'public', 'index.html'))
        .catch( err => {
            console.error(err);
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(500);
            return res.end(err);
        });

    // we can now assume that indexFile holds the contents of the file
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    return res.end(indexFile);

    // Old bad synchronous way
    /*fs.readFile(path.resolve(__dirname, 'public', 'index.html'), (err, data) => {
        res.setHeader("Content-Type", "text/html");
        if (err) {
            res.writeHead(500);
            return res.end("Some error occurred:");
        }

        res.writeHead(200);
        return res.end(data);
    })*/

});

// port 80 443

server.listen(process.env.PORT, () => {
    console.log("Listening...");
});

// import {App} from "./app";
// import {FastifyInstance} from "fastify";
//
// const app: FastifyInstance = App({
//     logger: {
//         level: 'info',
//         transport: {
//             target: 'pino-pretty'
//         }
//     }
// });
//
//
// const host_addr = '0.0.0.0';
// app.listen({port: 3000, host: host_addr},
//     (err, _address) => {
//         if (err) {
//             app.log.error(err);
//             process.exit();
//         }
//         const msg = `Server listening on '${host_addr}' ...`;
//         console.log(msg);
//         app.log.info(msg);
//     });
