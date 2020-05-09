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

    socket.on('disconnect', function(){
        console.log(`Socket: ${socket} disconnected.`);
    })
});