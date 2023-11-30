const { Pool } = require("pg")

const pool = new Pool({
    host: "db",
    port: 5432,
    user: "arrpit",
    password: "incorrect",
    database: "users"
})

module.exports = pool