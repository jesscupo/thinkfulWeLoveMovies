const path = require("path");

require("dotenv").config();

const {
  DATABASE_URL = "postgres://lugdnsvl:jOkg1cPmtxWpk0wiANGTorc4zl8EpPAl@bubble.db.elephantsql.com/lugdnsvl"
} = process.env;

module.exports = {

  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory:  path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src",  "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory:  path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src",  "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
