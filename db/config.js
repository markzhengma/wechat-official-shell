const options = {
    query:(e) => {
        console.log(e.query);
    }
};

const pgp=require('pg-promise')(options);

//----------native dev section-------------
// function setDatabase(){
//     if(process.env.NODE_ENV==='development'||!process.env.NODE_ENV){
//         return pgp({
//             database: 'wechat_shell_db',
//             port: 5432,
//             host: 'localhost',
//         })
//     } else {
//         return pgp(process.env.DATABASE_URL);
//     }
// }

// const db = setDatabase();

// module.exports = db;
//-----------native dev section------------//

let db;

if (process.env.NODE_ENV==='development'||!process.env.NODE_ENV){
    db = pgp({
        database: 'wechat_shell_db',
        port: 5432,
        host: 'localhost',
    })
} else if (process.env.NODE_ENV === 'production'){
    db = pgp(process.env.DATABASE_URL);
}

module.exports = db;

// const { Client } = require('pg');

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
// });

// client.connect();

// client.query('SELECT table_schema,table_name FROM infromation_schema.tables;', (err, res) => {
//     if (err) throw err;
//     for(let row of res.rows) {
//         console.log(JSON.stringify(row));
//     }
//     client.end();
// })

// module.exports = client;