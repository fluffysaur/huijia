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

    socket.on('upvote', function(targetID) {
        console.log('upvoted ' + targetID);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`UPDATE HuiJia_Submissions SET upvotes=upvotes+1 WHERE id=${targetID}`, function(err, result) {
                if (err) throw err;
            })
            connection.release();
        })
    });

    socket.on('unupvote', function(targetID) {
        console.log('unupvoted ' + targetID);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`UPDATE HuiJia_Submissions SET upvotes=upvotes-1 WHERE id=${targetID}`, function(err, result) {
                if (err) throw err;
            })
            connection.release();
        })
    })

    // socket.on('view', function(targetID) {
    //     addView(targetID);
    // });

    socket.on('submitidea', function(entry){
        // Submission Code Here
        pool.getConnection(function(err, connection){
            if (err) throw err;
            connection.query(`INSERT INTO HuiJia_Submissions (name, category, idea, description, imageurl, url) VALUES ('${entry.name}', '${entry.cat}', '${entry.idea}', '${entry.desc}', '${entry.imageurl}', '${entry.url}')`, function (err, result) {
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

    socket.on('getCard', function(query) {
        pool.getConnection(function(err, connection){
            if (err) throw err;
            if (isNaN(query) == false && query != '' && query != null){ // if there is a query and it is a number (id)
                connection.query(`SELECT * FROM HuiJia_Submissions WHERE id=${query}`, function(err, result) {
                    if (err) throw err;
                    if (result.length > 0) {
                        console.log(`Retrieving card ${query} from name ${result[0].name}...`);
                        socket.emit('recCard', result[0]);
                        addView(result[0].id);
                    }
                    connection.release();
                });
            } else { // Random
                connection.query(`SELECT * FROM HuiJia_Submissions WHERE approved=1`, function(err, result) {
                    if (err) throw err;
                    if (result.length > 0) {
                        console.log(`Retrieving random card...`);
                        var randInt = rollDice(0, result.length-1);
                        socket.emit('recCard', result[randInt]);
                        addView(result[randInt].id);
                    }
                    connection.release();
                });
            }
        })
    });
    
    socket.on('disconnect', function(){
        console.log(`Socket: ${socket} disconnected.`);
    });
});

rollDice = (min, max) => {
    var range = max-min;
    return Math.floor(Math.random()*(range+1) + min);
}

addView = (targetID) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`UPDATE HuiJia_Submissions SET views=views+1 WHERE id=${targetID}`, function(err, result) {
            if (err) throw err;
        })
        connection.release();
    })
}