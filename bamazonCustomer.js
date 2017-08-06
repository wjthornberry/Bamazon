// Require mysql node package
var mysql = require('mysql');
// Require inquirer node package
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'Bamazon'
});

connection.connect(function (err) {
    if(err) throw err;
    displayProducts();
});

function displayProducts() {
    console.log('Products available for purchase...\n');
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        checkoutProcess();
    });
    // Log current query
    //console.log(query.sql);
}
// start f(x) prompts user for input
function checkoutProcess() {
    // Prompt user for input re: the item they would like to purchase
    inquirer
        .prompt([
            {
                name: 'ItemID',
                type: 'input',
                message: 'Please enter the ItemID number of the product you would like to buy.'
            },
            {
                name: 'Quantity',
                type: 'input',
                message: 'How many would you like to purchase?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // Upon completetion of the user's input, insert a new item into the bamazon_DB with that info
            connection.query(
                "INSERT INTO products set ?",
                {
                    ItemID: answer.item - id,
                    Quantity: answer.item - quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log('Checkout process complete.')
                    // re-prompt the user to purchase another item
                    checkoutProcess();
                }
            );
        });

}
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

// Code from class for createProduct f(x)
// connection.connect(function (err) {
//     if(err) throw err;
//     console.log(`Connected as id ${connection.threadId} \n`);
//     createProduct();
// });

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
            // Call deleteProduct after updateProduct f(x) completes
            delete Product();
        }
    );
    // Log the current query being run
    console.log(query.sql)
}

function deleteProduct() {
    console.log('Deleteing product...\n');
    connection.query(
        "DELETE FROM bamazon_DB WHERE ?",
        {
            item_id: ''
        },
        function (err, res) {
            console.log(`${res.affectedRows} product deleted.\n`);
            // Call readProducts after deleteProduct f(x) completes
            readProducts();
        }
    );
}

