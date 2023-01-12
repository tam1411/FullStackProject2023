"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const app = (0, app_1.App)({
    logger: {
        level: 'info',
        transport: {
            target: 'pino-pretty'
        }
    }
});
const host_addr = '0.0.0.0';
app.listen({ port: 3000, host: host_addr }, (err, _address) => {
    if (err) {
        app.log.error(err);
        process.exit();
    }
    const msg = `Server listening on '${host_addr}' ...`;
    console.log(msg);
    app.log.info(msg);
});
//# sourceMappingURL=index.js.map