# Bamazon
Bamazon is a Command Line Interface (CLI) app that takes in orders from customers and depletes stock from the store's inventory. It runs on Node.js and MySQL. 

## Getting started

1. Open your command line (CLI) program (*e.g.*, Bash (Windows), Terminal (Mac), etc.)

2. [Clone](git@github.com:wjthornberry/Bamazon.git) or fork this repo to your computer (hint: you will need [Node.js](https://nodejs.org/en/download/) installed to run this app.)

3. To install the required packages, type
```
npm install
```

OR

Install them manually:

   * [Inquirer](https://www.npmjs.com/package/inquirer) - asks the user questions and notes the response.

   * [mysql](https://www.npmjs.com/package/mysql) -
   This is a node.js driver for mysql. It is written in JavaScript, does not require compiling, and is 100% MIT licensed.

   * [Colors](https://www.npmjs.com/package/colors) - adds color to text to enhance readability.

4. To run the application, type 
```
node bamazonCustomer.js
```
The system will display the products currently in inventory and, after an Item ID is entered, the order will either be placed or – if there isn't enough stock of the item in question — you will be informed that the order cannot be placed. 

## Demo

[Walkthrough](https://youtu.be/CUhP7hABPhg) on YouTube.

## Copyright

Jake Thornberry (C) 2017.


