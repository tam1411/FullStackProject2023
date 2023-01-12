"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const fastify_1 = __importDefault(require("fastify"));
const mockData_1 = require("../test/mockData");
function App(opts = {}) {
    const app = (0, fastify_1.default)(opts);
    addRoutes(app);
    return app;
}
exports.App = App;
function addRoutes(app) {
    app.get('/', async function (_request, _reply) {
        return { hello: 'world' };
    });
    app.get('/users', async () => {
        return mockData_1.usersData;
    });
    return app;
}
//# sourceMappingURL=app.js.map