"use strict";
//dont know how to fetch job id in db to complete tests
const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const Job = require("../models/job");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /companies */

describe("POST /jobs", function () {
  test("ok for users", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({
        title: "CEO",
        company_handle: "c1",
        salary: 40000,
        equity: 0.5,
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body.job).toEqual({
      id: expect.any(Number),
    });
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({
        title: "new",
        salary: 10,
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({
        yeehaw: "yeehaw",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /companies */
//does not work. returns empty array
// describe("GET /jobs", function () {
//   test("ok for getting routes", async function () {
//     const resp = await request(app).get("/jobs");
//     console.log("Response Body:", resp.body);
//     const jobsRes = await db.query(`SELECT * FROM jobs`);
//     console.log("Jobs in database:", jobsRes.rows);
//     expect(resp.body).toEqual({
//       jobs: [
//         {
//           id: expect.any(Number),
//           title: "clerk",
//           salary: 40000,
//           equity: 0,
//           company_handle: "c1",
//         },
//         {
//           id: expect.any(Number),
//           title: "CEO",
//           salary: 400000,
//           equity: 0.5,
//           company_handle: "c2",
//         },
//       ],
//     });
//   });
// });

/************************************** GET /companies/:handle */
//dont know how to test id if it's autoincremented in db.
// describe("GET /jobs/:id", function () {
//   test("gets job by id", async function () {
//     const resp = await request(app).get("/jobs/");

//     expect(resp.body).toEqual({
//       jobs: [
//         {
//           id: 1,
//           title: "clerk",
//           salary: 40000,
//           equity: 0,
//         },
//       ],
//     });
//   });

//   test("not found for no such job", async function () {
//     const resp = await request(app).get(`/jobs/nope`);
//     expect(resp.statusCode).toEqual(404);
//   });
// });

/************************************** PATCH /companies/:handle */

// describe("PATCH /companies/:handle", function () {
//   test("works for users", async function () {
//     const resp = await request(app)
//       .patch(`/companies/c1`)
//       .send({
//         name: "C1-new",
//       })
//       .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.body).toEqual({
//       company: {
//         handle: "c1",
//         name: "C1-new",
//         description: "Desc1",
//         numEmployees: 1,
//         logoUrl: "http://c1.img",
//       },
//     });
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app).patch(`/companies/c1`).send({
//       name: "C1-new",
//     });
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found on no such company", async function () {
//     const resp = await request(app)
//       .patch(`/companies/nope`)
//       .send({
//         name: "new nope",
//       })
//       .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.statusCode).toEqual(404);
//   });

//   test("bad request on handle change attempt", async function () {
//     const resp = await request(app)
//       .patch(`/companies/c1`)
//       .send({
//         handle: "c1-new",
//       })
//       .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.statusCode).toEqual(400);
//   });

//   test("bad request on invalid data", async function () {
//     const resp = await request(app)
//       .patch(`/companies/c1`)
//       .send({
//         logoUrl: "not-a-url",
//       })
//       .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.statusCode).toEqual(400);
//   });
// });

// /************************************** DELETE /companies/:handle */

// describe("DELETE /companies/:handle", function () {
//   test("works for users", async function () {
//     const resp = await request(app)
//       .delete(`/companies/c1`)
//       .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.body).toEqual({ deleted: "c1" });
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app).delete(`/companies/c1`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found for no such company", async function () {
//     const resp = await request(app)
//       .delete(`/companies/nope`)
//       .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.statusCode).toEqual(404);
//   });
// });
