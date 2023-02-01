
import {buildApp} from "../src/server";
import {describe, it, expect, beforeAll, afterAll, test} from 'vitest'
// @ts-ignore
import supertest from 'supertest'
import { usersData } from '../src/lib/mockData';

let app;

beforeAll(async () => {
	// called once before all tests run
	app = await buildApp(false);
	await app.ready()
})

describe('Test server basic health', () => {
	it('serve GET /', async () => {
		const res = await app.inject('/');
		expect(res.statusCode).toEqual(200);
	})
})

test('with HTTP injection', async () => {
	const response = await app.inject({
		method: 'GET',
		url: '/usersData',
	})

	expect(response.statusCode).toBe(200)
	expect(JSON.parse(response.payload)).toHaveLength(4)
	expect(JSON.parse(response.payload)).toStrictEqual(usersData)
})

test('with a running server', async () => {
	await app.ready()

	const response = await supertest(app.server)
		.get('/usersData')
		.expect(200)

	expect(response.body).toHaveLength(4)
	expect(response.body).toStrictEqual(usersData)
})

afterAll(async () => {
	await app.close()
})
