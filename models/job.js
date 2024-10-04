"use strict";

const { query } = require("express");
const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Job {
  static async findAll(q = {}) {
    let whereClause = "";
    let queryParams = [];

    //validate query params (i.e if there is an incorrect q param.)
    if (
      Object.keys(q).some(
        (key) => !["title", "minSalary", "hasEquity"].includes(key)
      )
    ) {
      throw new BadRequestError("Invalid Query Parameter");
    }
    //filtering based off of query params
    if (q.title) {
      whereClause += " AND title ILIKE $1";
      queryParams.push(`%${q.title.toLowerCase()}%`);
    }
    if (q.minSalary) {
      whereClause += " AND salary >= $1";
      queryParams.push(q.minSalary);
    }
    //list jobs with equity greater than 0 or all jobs if undefined or hasEquity = false.
    if (q.hasEquity === "true") {
      whereClause += " AND equity IS NOT NULL AND equity > 0";
    }

    const query = `SELECT id,
                          title,
                          company_handle,
                          salary AS "minSalary",
                          equity AS "hasEquity"
                     FROM jobs
                     WHERE 1=1 ${whereClause}
                     ORDER BY title`;

    const jobsRes = await db.query(query, queryParams);
    return jobsRes.rows;
  }

  static async get(id) {
    const sql = `SELECT * FROM jobs WHERE id = $1`;
    const result = await db.query(sql, [id]);
    return result.rows[0];
  }

  static async create(job) {
    const result = await db.query(
      `INSERT INTO jobs (title, salary, equity, company_handle)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
      [job.title, job.salary, job.equity, job.company_handle]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const setCols = [];
    const values = [];
    let index = 1;

    for (let key in data) {
      setCols.push(`${key} = $${index}`);
      values.push(data[key]);
      index++;
    }

    const sql = `UPDATE jobs SET ${setCols.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;
    values.push(id);

    const result = await db.query(sql, values);
    return result.rows[0];
  }

  static async remove(id) {
    const sql = `DELETE FROM jobs WHERE id = $1`;
    await db.query(sql, [id]);
  }
}

module.exports = Job;
