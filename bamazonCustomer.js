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
    console.log(`Connected as id ${connection.threadId} \n`);
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
connection.connect(function (err) {
    if(err) throw err;
    console.log(`Connected as id ${connection.threadId} \n`);
    createProduct();
});

function createProduct() {
    console.log('Inserting a new product...\n');
    var query = connection.query(
        'INSERT INTO bamazon_DB SET?',
    {
        item_id: 'B018KFP8E4',
        product_name: 'Myofascial Release Foam Roller',
        department_name: 'Sports & Outdoors',
        price: 18.99,
        stock_quantity: 20
    },
    function (err, res) {
        console.log(err);
        console.log(`${res.affectedRows} product successfully inserted.`);
        UpdateProduct();
    }
);

// Log the current query being run
console.log(query.sql);
}

function updateProduct() {
    console.log('Updating all product quantities \n');
    var query = connection.query(
        'UPDATE bamazon_DB SET ? WHERE ?',
        [
            {
                item_id: ''

            },
            {
                product_name: ''
            },
            {
                department_name: ''
            },
            {
                price: ''
            },
            {
                stock_quantity:''
            }
        ],
        function(err, res) {
            console.log(`${res.affectedRows} products successfully updated.\n`);
            // Call deleteProduct after updateProduct fx completes
            delete Product();
        }
    );
    // Log the current query being run 
    console.log(query.sql)
}