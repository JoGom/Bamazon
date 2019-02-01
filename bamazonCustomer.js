let mysql = require("mysql");
let columnify = require("columnify");
let inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: "localhost",
    port:  3306,
    user: "root",
    password: "1027985.Gg@",
    database: "bamazon"
});

connection.connect(function(err){ 
    if(err) throw err;
    console.log(`**** Successfully connected to Bamazon inventory as ID ${connection.threadId} *****\n`);
    displayInventory();
});

function displayInventory(){
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res){
        if(err) throw err;
        console.log(columnify(res));
        userPrompt();
    });
};

function userPrompt(){
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View products",
        "Purchase an item",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View products":
        displayInventory();
        break;

      case "Purchase an item":
        purchaseItem();
        break;

      case "Exit":
        console.log(`=====================`);
        console.log(`Thank you come again!`);
        console.log(`=====================`);
        connection.end();
        break;
      }
    });
}

