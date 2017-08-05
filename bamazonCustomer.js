// Require mysql node package
var mysql = require('mysql');
// Require inquirer node package
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // Username
    user: 'root',
    // Password
    password: '',
    database: 'bamazon_DB'
});
