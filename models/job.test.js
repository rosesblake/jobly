"use strict";

const request = require("supertest");
const { query } = require("express");
const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);
describe("Job routes", () => {
  describe("GET /jobs", () => {
    test("works: no filter", async () => {
      const jobs = await Job.findAll();
      expect(jobs).toEqual([
        {
          company_handle: "c2",
          hasEquity: "0.5",
          id: expect.any(Number),
          minSalary: 400000,
          title: "CEO",
        },
        {
          company_handle: "c1",
          hasEquity: "0",
          id: expect.any(Number),
          minSalary: 40000,
          title: "clerk",
        },
      ]);
    });

    test("works: query by title", async () => {
      const jobs = await Job.findAll({ title: "clerk" });
      expect(jobs).toEqual([
        {
          company_handle: "c1",
          hasEquity: "0",
          id: expect.any(Number),
          minSalary: 40000,
          title: "clerk",
        },
      ]);
    });
  });

  // describe("GET /jobs/:id", () => {
  //   test("works", async () => {
  //     const newJob =
  //       await db.query(`INSERT INTO jobs(title, salary, equity, company_handle)
  //           VALUES ('assistant', 20000, 0.2, 'c2')
  //           RETURNING *`);
  //     const id = newJob.rows[0].id;
  //     const res = await Job.get(id);
  //     expect(res.body.jobs).toEqual([
  //       {
  //         company_handle: "c1",
  //         hasEquity: "0",
  //         id: expect.any(Number),
  //         minSalary: 40000,
  //         title: "clerk",
  //       },
  //     ]);
  //   });
  // });

  //   describe("GET /jobs/:id", () => {
  //     test("works", async () => {
  //       try {
  //         const newJob = await db.query(`
  //           INSERT INTO jobs(title, salary, equity, company_handle)
  //           VALUES ('assistant', 20000, 0.2, 'c2')
  //           RETURNING *;
  //         `);
  //         const insertedJob = newJob.rows[0]; // Access the first row from the result
  //         console.log("Inserted job:", insertedJob); // Log the inserted job

  //         const job = await Job.get(insertedJob.id); // Use the inserted job's ID

  //         // Expect the job to match the inserted job
  //         expect(job).toEqual({
  //           id: expect.any(Number),
  //           title: "assistant",
  //           salary: 20000,
  //           equity: "0.2", // Ensure this matches your data type
  //           company_handle: "c2",
  //         });
  //       } catch (error) {
  //         console.error("Error in test:", error); // Log any errors in the test
  //       }
  //     });
  //   });
});
