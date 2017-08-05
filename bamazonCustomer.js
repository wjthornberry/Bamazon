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

connection.connect(function (err) {
    if(err) throw err;
    console.log(`Connected as ${connection.threadID}`);

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
    });
});

// Challenge #1: Customer View
// displayItems function
// display all items, including product numbers, names, and prices

// Prompt the user w/two messages
// 1) Product ID:
// 2) Quantity:

// Customer places order, app check if the store has enough
// of the product to meet the customer's request

// If not, log a phrase like `This item is out of stock` 
// and prevent the order from going through

// If the store has enough quantity of the item, fulfill customer's order
// Update SQL database to reflect the remaining quantity
// Once the update goes through, show the customer the total cost 
// of their purchase
