DROP DATABASE IF EXISTS zamazon_DB;

CREATE DATABASE zamazon_DB;

USE zamazon_DB;

CREATE TABLE zamazon (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(20) NOT NULL,
  department_name VARCHAR(20) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO zamazon(product_name, department_name, price, stock_quantity)

VALUES
("Dragon ball", "animation", 25, 50),
("One piece", "animation", 20, 20),
("apple", "fruit", 2, 30),
("orange", "fruit", 3, 43),
("lays", "junkfood", 5, 99),
("Doritos", "junkfood", 3, 15),
("Call of Duty", "game", 60, 80),
("Street Fighter", "game", 60, 79),
("Matrix","movie", 9, 1);