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
    item_id INTEGER(12) NOT NULL,
    -- product's name --
    product_name VARCHAR(255) NOT NULL,
    -- department's name -- 
    department_name VARCHAR(255) NOT NULL,
    -- item's cost to customer; max number of digits is 10 and two of the digits will be decimals --
    price DECIMAL(10,2),
    -- stock quantity, or how much of the product is available in stores --
    stock_quantity INTEGER(255) NOT NULL,
);
