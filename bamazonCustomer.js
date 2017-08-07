// Require mysql node package
var mysql = require('mysql');
// Require inquirer node package
var inquirer = require('inquirer');
// Require colors node package
var colors = require('colors');

// colors basic theme
colors.setTheme({
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

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
    console.log('\nWelcome to Bamazon!\n');
});

// Lists the contents of the Bamazon table, products
function displayProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log('Products:');
        for (var i = 0; i < res.length; i++) {
            console.log(`-----------------------------------------------------------------------\nItem ID: ${res[i].item_id}\nProduct: ${res[i].product_name}\nDepartment: ${res[i].department_name}\nPrice: $${res[i].price}\n-----------------------------------------------------------------------\n`);
        }
        // console.log(res);
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
                name: 'item_id',
                type: 'input',
                message: 'Please enter the ItemID number of the product you would like to buy.'.input,
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'How many would you like to purchase?'.input,
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            var waitMsg;
            var item = answer.item_id;
            var quantity = answer.quantity;
            // Checks products db in order to confirm the itemID exists in the customer's desired quantity
            console.log('-----------------------------------------------------------------------')
            console.log('Checking our warehouse to see if this awesome item is still in stock...')
            console.log('-----------------------------------------------------------------------')
            var queryStr = 'SELECT * FROM products WHERE ?';
            
            connection.query(queryStr, {item_id: item}, function(err, data) {
                if (err) throw err;
                // Checks to see if the user entered a correct itemID
                if (data.length === 0) {
                    console.log(`Uh oh. That doesn't seem to be a valid Item ID. Please try again.`.error);
                    displayProducts();
                } else {
                    var productData = data[0];

                    // Checks the db to ensure there is enough product to fulfill the user's order request
                    if (quantity <= productData.stock_quantity) {
                        console.log('Item status:')
                        console.log('In stock.'.green);
                        console.log('Processing your order now...');
                        // Not sure if my syntax is correct for this line -- revisit later
                        var updateQueryStr = `UPDATE products SET stock_quantity = ${productData.stock_quantity - quantity} WHERE item_id = ${item}`;
                        // Update inventory
                        connection.query(updateQueryStr, function(err, data) {
                            if (err) throw err;
                            // Check syntax
                            console.log('Okay, your order has been placed! The total is:')
                            console.log(`$${productData.price * quantity}`.red);
                            console.log('Thanks for shopping at Bamazon.'.cyan);
                            console.log('\n-----------------------------------------------------------------------\n');
                            // Ends the database connection
                            connection.end();
                        }) 
                    } else  {
                        console.log('Item status:');
                        console.log('Out of stock.'.error);
                        console.log(`Uh oh, it seems that we currently don't have enough product in our warehourse to fulfill this order.`);
                        console.log('\n-----------------------------------------------------------------------\n');
                        console.log('Would you like to order something else, perhaps?');
                        console.log('\n-----------------------------------------------------------------------\n');
                        console.log('Will display items again in four seconds.')
                        waitMsg = setTimeout(displayProducts, 4000);
                    }
                }
            })
            // completeTransaction(itemIDRequested, quantityRequested);
        });
};

// This f(x) 
// a) Checks whether there is enough quantity of the item requested and either
// b) Completes the transaction, showing the user the cost of their order 
// AND deletes the purchased quantity from the products db 
// OR
// c) Informs them that their order could not be fulfilled
// function completeTransaction(ItemID, quantityRequested) {
//     connection.query(`SELECT * FROM products' WHERE ItemID = ${ItemID}`, function(err, res) {
//         if(err) throw err;
//         // a) Checks quantity to ensure there is adequate stock
//         if (quantityRequested <= res[0].StockQuantity) {
//             // If there is, calculates the total cost
//             var totalCost = res[0].Price * quantityRequested;
//             // Informs the user that item is available at that quantity and tells them the totacl cost
//             console.log(`Great! We have plenty of ${res[0].Product}.`);
//             console.log('-----------------------------------------------------------------------');
//             console.log('Calculating total cost...');
//             console.log('-----------------------------------------------------------------------');
//             console.log(`The total cost for ${quantityRequested} ${res[0].Product} is ${totalCost}.`);
//             inquirer
//                 .prompt({
//                     name: 'action',
//                     type: 'rawlist',
//                     message: 'How will you be paying today?',
//                     choices: [
//                         'Cash is king.',
//                         'I\'ll push you some plastic.',
//                         'Bitcoin, boyo.',
//                         'Do you accept Ether?',
//                         'I\'d like to pay in wompom.',
//                         'Got any dishes I can wash? I\'m broke but really need to buy this.'
//                     ]
//                 })
//                 .then(function(answer) {}
//                     var waitMsg;
//                     switch (answer.action) {
//                         case 'Cash is king.':
//                         console.log('We\'ve not seen cash here in these parts for quite some time, but, yes, we still accept it.')
//                         break;

//                         case 'I\'ll push you some plastic.':
//                         console.log('Plastic works. Lemme give that puppy a swipe.')
//                         break;

//                         case 'Bitcoin, boyo.':
//                         console.log('Step right up — we\'d be more than happy to take that Bitcoin out of your hardware wallet.')
//                         break;

//                         case 'Do you accept Ether?':
//                         console.log('Of course! Why wouldn\'t we?')
//                         break;

//                         case 'I\'d like to pay in wompom.':
//                         console.log('That\'s fine, but I\'m going to need to check the exchange rate on that. Gimme a sec.')
//                         break;

//                         case 'Got any dishes I can wash? I\'m broke but really need to buy this.':
//                         console.log('No, but go ahead and take it — Jeff isn\'t watching.')
//                         break;
//                     }
//                 });
//                 connection.query(`UPDATE products SET StockQuantity = StockQuantity - ${quantityRequested} WHERE ItemID = ${ItemID}`);
//         } else {
//             console.log('Uh oh — it looks like we\'re all out of that. Please try again later or select another item.');
//                         console.log('-----------------------------------------------------------------------');
//                         console.log('Will display items again in 5 seconds.')
//             waitMsg = setTimeout(displayProducts, 5000);
//         };
//         // recursion to re-display the products table and allow the user to select another item
//         // displayProducts();
//     });
// };



// // Challenge #1: Customer View
// // displayItems function
// // display all items, including product numbers, names, and prices

// // Prompt the user w/two messages
// // 1) Product ID:
// // 2) Quantity:

// // Customer places order, app check if the store has enough
// // of the product to meet the customer's request

// // If not, log a phrase like `This item is out of stock` 
// // and prevent the order from going through

// // If the store has enough quantity of the item, fulfill customer's order
// // Update SQL database to reflect the remaining quantity
// // Once the update goes through, show the customer the total cost 
// // of their purchase

// // Code from class for createProduct f(x)
// // connection.connect(function (err) {
// //     if(err) throw err;
// //     console.log(`Connected as id ${connection.threadId} \n`);
// //     createProduct();
// // });

// function createProduct() {
//     console.log('Inserting a new product...\n');
//     var query = connection.query(
//         'INSERT INTO bamazon_DB SET?',
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
//         UpdateProduct();
//     }
// );

// // Log the current query being run
// console.log(query.sql);
// }

// function updateProduct() {
//     console.log('Updating all product quantities \n');
//     var query = connection.query(
//         'UPDATE bamazon_DB SET ? WHERE ?',
//         [
//             {
//                 item_id: ''

//             },
//             {
//                 product_name: ''
//             },
//             {
//                 department_name: ''
//             },
//             {
//                 price: ''
//             },
//             {
//                 stock_quantity:''
//             }
//         ],
//         function(err, res) {
//             console.log(`${res.affectedRows} products successfully updated.\n`);
//             // Call deleteProduct after updateProduct f(x) completes
//             delete Product();
//         }
//     );
//     // Log the current query being run
//     console.log(query.sql)
// }

// function deleteProduct() {
//     console.log('Deleteing product...\n');
//     connection.query(
//         "DELETE FROM bamazon_DB WHERE ?",
//         {
//             item_id: ''
//         },
//         function (err, res) {
//             console.log(`${res.affectedRows} product deleted.\n`);
//             // Call readProducts after deleteProduct f(x) completes
//             readProducts();
//         }
//     );
// }
