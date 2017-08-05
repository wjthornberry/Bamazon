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
    readProducts();
});

function displayProducts() {
    console.log('Products available for purchase...\n');
    connection.query('SELECT * FROM bamazon_DB', function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        var displayTable = new displayTable({
            // Declares the values' categories
            head: ['Item Id', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
        });
        // Each loop makes an additional row
        for (i = 0; i < res.length; i++) {
            // Which is then pushed to the table
            displayTable.push([
                res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        // Log table to console
        console.log(displayTable.toString());
        // After table loads, run checkoutProces f(x)
        checkoutProcess();
    });
    // Log current query
    console.log(query.sql);
};
// start f(x) prompts user for input
function checkoutProcess() {
    // Prompt user for input re: the item they would like to purchase
    inquirer
    .prompt([
        {
            name: 'item-id',
            type: 'input',
            message: 'Please enter the item ID number of the product you would like to buy.'
        },
        {
            name: 'item-quantity',
            type: 'input',
            message: 'How many would you like to purchase?',
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }   return false;
            }    
        }
    ])
    .then(function(answer) {
        // Upon completion of the user's input, insert a new item into the bamazon_DB with that info
      connection.query(
          "INSERT INTO bamazon_DB set ?",
      {
          item_id: answer.item-id,
          stock_quantity: answer.item-quantity
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

// pseudocode
// Assignment part 1: Customer View
// Prompt user with two messages:
// 1) Ask them the ID of the product they would like to buy
// 2) How many units they would like to buy

// After order has been placed:
// App should check to see whether the store has sufficient quantity of the item to fulfil the order request
// If not, log 'Insufficient quanitity' and prevent order from being processed
// If, however, there is sufficient quantity, fulfill the order:
// 1) Update the SQL database to reflect the remaining quantity
// After it is updated, show the customer the total cost of their purchase