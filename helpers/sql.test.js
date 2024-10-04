const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", () => {
  test("works: updates a company", () => {
    const dataToUpdate = {
      name: "Updated Company",
      numEmployees: 50,
    };
    const jsToSql = { numEmployees: "num_employees" };
    const { setCols, values } = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(setCols).toBe('"name"=$1, "num_employees"=$2');
    expect(values).toEqual(["Updated Company", 50]);
  });

  test("works: updates a user", () => {
    const userDataUpdate = {
      firstName: "Helen",
      lastName: "Johnson",
      isAdmin: false,
    };
    const jsToSql = { firstName: "first_name", lastName: "last_name" };

    const { setCols, values } = sqlForPartialUpdate(userDataUpdate, jsToSql);

    expect(setCols).toBe('"first_name"=$1, "last_name"=$2, "isAdmin"=$3');
    expect(values).toEqual(["Helen", "Johnson", false]);
  });
});
