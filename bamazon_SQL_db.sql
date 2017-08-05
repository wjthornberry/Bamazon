-- Drops the bamazon_SQL_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_SQL_db;

-- Creates the "bamazon_SQL_db" database --
CREATE DATABASE bamazon_SQL_db;

-- All of the following code will affect bamazon_SQL_db -- 
USE bamazon_SQL_db;

-- Creates the "products" table within bamazon_SQL_db --
CREATE TABLE products (
    -- Makes a numeric column called "item_id" which 
    -- cannot contain null and is a unique id for each product --
    item_id INT(12) AUTO_INCREMENT NOT NULL,
    -- product's name --
    product_name VARCHAR(255) NULL,
    -- department's name -- 
    department_name VARCHAR(255) NULL,
    -- item's cost to customer; max number of digits is 10 and two of the digits will be decimals --
    price DECIMAL(10,2), NULL,
    -- stock quantity, or how much of the product is available in stores --
    stock_quantity INT(255) NULL,
    -- Sets the primary key of the table to item_id --
    PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("JL421 Badonkadonk Land Cruiser/Tank", "Everything Else", 19,999.95, 2),

("Custom Nicolas Cage Pillowcase Standard Size Design Cotton Pillow Case P-170", "Home and Kitchen", 6.00, 50),

("Jeff Goldblum Custom Waterproof Shower Curtain 60x72 Inch Bath Curtains by LiangZP", "Home and Kitchen", 15.00, 10),

("Duncan Butterfly Yo-Yo", "Toys and Games", 5.43, 20),

("Exploding Kittens: NSFW Edition", "Toys and Games", 19.99, 30),

("Zen Reflections Juniper Bonsai", "Patio, Lawn, and Garden", 26.99, 15),

("Chemex 6-Cup Classic Series Glass Coffee Maker", "Kitchen & Dining", 37.82, 30),

("Blue Bottle Coffee - New Orleans Iced Kit", "Grocery & Gourmet Food", 36.99, 50),

("You Don't Know JS: Up & Going", "Books", 4.99, 1),

("Kodak Portra 400 Professional ISO 400, 35mm, 36 Exposures, Color Negative Film 5 Roll per Pack", "Film", 43.90, 3),

SELECT * FROM products;


