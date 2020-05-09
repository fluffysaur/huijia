// server.js

require('dotenv').config();

const express = require('express')
, app = express()
, server = require('http').createServer(app)
, port = process.argv[2] || 3000
, socketio = require('socket.io')
, mysql = require('mysql')
, pool = mysql.createPool({
	host : process.env.MYSQLHOST,
	user : process.env.MYSQLUSER,
	password : process.env.MYSQLPASS,
	database : process.env.MYSQLDB,
    charset : 'utf8mb4',
    port : process.env.MYSQLPORT
});

app.use(express.static('www'));

server.listen(port, function(){
    console.log (`Server listening on port ${port}.`)
});

socketio.listen(server).on('connection', function (socket) {
    console.log(`Got a connection on socket: ${socket}.`);

    socket.on('submitidea', function(entry){
        // Submission Code Here
        pool.getConnection(function(err, connection){
            if (err) throw err;
            connection.query(`INSERT INTO HuiJia_Submissions (name, category, idea, description, url) VALUES ('${entry.name}', '${entry.cat}', '${entry.idea}', '${entry.desc}', '${entry.url}')`, function (err, result) {
                if (err) {
                    socket.emit('submitFail');
                    throw err;
                }
                socket.emit('submitSuccess');
            })
            connection.release();
        })
    })

    socket.on('reqCards', function(category) {
        pool.getConnection(function(err, connection){
            if (err) throw err;
            connection.query(`SELECT * FROM HuiJia_Submissions WHERE category='${category}' AND approved=1`, function (err, result) {
                if (err) throw err;
                socket.emit('recCards', result);
                console.log(`${result.length} recCards emitted!`);
                connection.release();
            });
        });
    });

    socket.on('needRandomCard', function() {
        console.log('random card requested');
        pool.getConnection(function(err, connection){
            if (err) throw err;
            connection.query(`SELECT id FROM HuiJia_Submissions WHERE approved=1`, function(err, result) {
                if (err) throw err;
                const randomNumber = rollDice(0, result.length);
                const randomId = result[randomNumber];
                connection.query(`SELECT * FROM HuiJia_Submissions WHERE id='${randomId}`, function(err, randomEntry) {
                    socket.emit('randomCard', randomEntry);
                    console.log(`${randomEntry} randomCard emitted!`);
                    connection.release();
                })
                connection.release();
            })
        })
    })

    socket.on('disconnect', function(){
        console.log(`Socket: ${socket} disconnected.`);
    })
});