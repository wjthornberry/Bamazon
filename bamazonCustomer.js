// Require mysql node package
var mysql = require('mysql');
// Require inquirer node package
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_DB'
});

connection.connect(function (err) {
    if(err) throw err;
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

// Code from class for createProduct fx
// connection.connect(function (err) {
//     if(err) throw err;
//     createProduct();
// });

// function createProduct() {
//     var query = connection.query('Add product?'
//     {
//         item_id: 'B018KFP8E4',
//         product_name: 'Myofascial Release Foam Roller',
//         department_name: 'Sports & Outdoors',
//         price: 18.99,
//         stock_quantity: 20
//     },
//     function (err, res) {
//         console.log(err);
//         console.log(`${res.affectedRows} product successfully inserted.`);
//     }
// )