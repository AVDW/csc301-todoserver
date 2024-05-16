const sql = require('@vercel/postgres').sql;
const Client = pg.Client;

const sql = new Client({
    host: process.env.NDB_HOST,
    port: 5432,
    database: process.env.NDB_DATABASE,
    user: process.env.NDB_USERNAME,
    password: process.env.NDB_PASSWORD
})


console.log(client);
 
module.exports = client;
