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
        printTable(res);
    });
}

