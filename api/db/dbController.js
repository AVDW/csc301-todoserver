const client = require('./connection-pg.js');



let db = {
    create: async(data) => {
        console.log("creating");
        await client.connect()
        // NOT WORKING, IT'S A PLACEHOLDER
        const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
        const values = [data.name, data.email]
        const res = await client.query(text, values)
        console.log(res);
        return res;
    },
    update: (data) => {
        return data;
    },
    delete: (id) => {
        return id;
    },
}

module.exports = db;