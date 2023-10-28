// const float = parseFloat
const int = parseInt;
// find one or default
const env = (k, v, fn) => {
  const val = process.env[k] || v || "";
  return fn ? fn(val) : val;
};
require("dotenv").config();
module.exports = {
    NODE_ENV: env("NODE_ENV", "development"),
    MSSQL_HOST: env("MSSQL_HOST"),
    MSSQL_PORT: env("MSSQL_PORT", int),
    MSSQL_NAME: env("MSSQL_NAME"),
    MSSQL_USERNAME: env("MSSQL_USERNAME"),
    MSSQL_PASSWORD: env("MSSQL_PASSWORD"),
};

