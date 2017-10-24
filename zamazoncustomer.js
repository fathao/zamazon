var mysql = require("mysql");
var inquirer = require("inquirer");
var printTable = require("./table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password: "rina0728",
    database: "zamazon_DB"
});

connection.connect(function(error) {
    if(error) throw error;
    // callbackfunction
    readProducts();
});

function readProducts() {
    console.log("Here are the most updated list of products that we have");
    connection.query("SELECT * FROM zamazon", function(err, res) {
        // if (err) throw err;
        // console.log(res);
        printTable(res, function() {
            whatToBuy();
        });
    });
}

function whatToBuy() {
    inquirer
    .prompt([
         {
            name: "id",
            type: "input",
            message: "What item would you like to purchase? (please insert the id number)",
            validate: value => isPositiveNumber(value)
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?",
            validate: value => isPositiveNumber(value)
        }
    ]).then(function(answer){
        connection.query("SELECT * FROM zamazon WHERE ?", {id: answer.id}, function(err, res) {
            if (res.length === 0) {
                console.log("id: " + answer.id + " does not exist");
                readProducts();
            } else {
                sendOrder(res[0], answer.quantity);
            }
        });
    });
}

function sendOrder(product, quantity) {
    var result = product.stock_quantity - quantity;
    if (result >= 0) {
        var params = [{ stock_quantity: result }, { id: product.id }];
        connection.query("UPDATE zamazon SET ? WHERE ?", params, function(err) {
            if (err) {
                console.error("System error! Sorry the order didin't go through.");
                readProducts();
            } else {
                console.log("Total price is: " + quantity * product.price);
                connection.end();
            }
        }); 
    }
}

function isPositiveNumber(value) {
    return /^\d+$/.test(value);
}
