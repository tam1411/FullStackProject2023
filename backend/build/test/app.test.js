"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const axios_1 = __importDefault(require("axios"));
const app_1 = require("../src/app");
const mockData_1 = require("./mockData");
let app = (0, app_1.App)({
    logger: false
});
(0, vitest_1.test)('with HTTP injection', async () => {
    const response = await app.inject({
        method: 'GET',
        url: '/users',
    });
    (0, vitest_1.expect)(response.statusCode).toBe(200);
    (0, vitest_1.expect)(JSON.parse(response.payload)).toHaveLength(4);
    (0, vitest_1.expect)(JSON.parse(response.payload)).toStrictEqual(mockData_1.usersData);
});
(0, vitest_1.test)('with a running server', async () => {
    await app.ready();
    const response = await (0, supertest_1.default)(app.server)
        .get('/users')
        .expect(200);
    (0, vitest_1.expect)(response.body).toHaveLength(4);
    (0, vitest_1.expect)(response.body).toStrictEqual(mockData_1.usersData);
});
(0, vitest_1.test)('with axios', async () => {
    await app.listen();
    await app.ready();
    const address = app.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    const response = await axios_1.default.get(`http://localhost:${port}/users`);
    (0, vitest_1.expect)(response.data).toHaveLength(4);
    (0, vitest_1.expect)(response.data).toStrictEqual(mockData_1.usersData);
});
(0, vitest_1.afterAll)(async () => {
    await app.close();
});
//# sourceMappingURL=app.test.js.map