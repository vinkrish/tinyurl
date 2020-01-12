var mysql = require('mysql')

// require('dotenv').config()

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT
  });

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

// create table url( `id` BIGINT NOT NULL AUTO_INCREMENT, `lengthy_url` varchar(1024), `shortened_url` varchar(16), `hash` varchar(64), PRIMARY KEY (`id`) );

// alter table url AUTO_INCREMENT=1000000

// ALTER TABLE url ADD created_on BIGINT NOT NULL;

// SELECT COUNT(*) as count, created_on FROM url GROUP BY created_on;

// connection.end()

module.exports = connection;