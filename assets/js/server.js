// server.js

require('dotenv').config();
const express = require('express');
const mysql = require('mysql');

const pool = mysql.createPool({
	host : process.env.MYSQLHOST,
	user : process.env.MYSQLUSER,
	password : process.env.MYSQLPASS,
	database : process.env.MYSQLDB,
    charset : 'utf8mb4',
    port : process.env.MYSQLPORT
});

$( document ).ready(function() {
    
});