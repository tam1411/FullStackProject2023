// Note this testing is for API or integration testing
// Unit tests belong in-source
import {buildApp} from "../src/server";
import {describe, it, expect, beforeAll, afterAll} from 'vitest';
// @ts-ignore
import supertest from 'supertest';
import {usersData} from '../src/lib/mockData';

let app;

describe('testing the test framework itself', () => {

  it('serves GET index page with 200 status', async () => {
    const res = await app.inject('/');
    expect(res.statusCode)
      .toEqual(200);
  });

  it('performs vitest injection requests properly', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/usersData',
    });

    expect(response.statusCode)
      .toBe(200);
    expect(JSON.parse(response.payload))
      .toHaveLength(4);
    expect(JSON.parse(response.payload))
      .toStrictEqual(usersData);
  });

  it('can use supertest-based API testing in addition to vitest injection', async () => {
    await app.ready();

    const response = await supertest(app.server)
      .get('/usersData')
      .expect(200);

    expect(response.body)
      .toHaveLength(4);
    expect(response.body)
      .toStrictEqual(usersData);
  });
});

describe("Route testing", () => {
  it("GETs /about properly", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/about"
    });

    expect(response.statusCode)
      .toBe(200);
    expect(response.payload)
      .toBe("about:GET");
  });

  it("GETs the proper userID back from /users/:userID", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/users/1"
    });

    expect(response.statusCode)
      .toBe(200);
    expect(response.payload)
      .toBe(JSON.stringify({ foo: "1", first_name: "Bobinsky", last_name: "Oso"}));
  });
});


beforeAll(async () => {
  // called once before all tests run
  app = await buildApp(false);
  await app.ready();
});


afterAll(async () => {
  await app.close();
});
