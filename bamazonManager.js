const mysql = require("mysql");
const columnify = require("columnify");
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port:  3306,
    user: "root",
    password: "1027985.Gg@",
    database: "bamazon"
});

connection.connect(function(err){ 
    if(err) throw err;
    console.log(`**** Successfully connected to Bamazon inventory as ID ${connection.threadId} *****\n`);
    userPrompt();
});

function userPrompt(){
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View products",
        "View low inventory items",
        "Add to inventory",
        "create a new product",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View products":
        displayInventory();
        break;

      case "View low inventory items":
        viewLowInventory();
        break;

      case "Add to inventory":
        addInventory();
      break;

      case "Create a new product":
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

function displayInventory(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        console.log("===============================================================================");
        console.log(columnify(res,{columnSplitter: ' | ', align: 'center'}));
        console.log("===============================================================================");
        userPrompt();
    });
};

function viewLowInventory(){
    const query = "SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 5";
    connection.query(query, function(err, res){
        if(err) throw err;
        console.log("===============================================================================");
        console.log("==========================  Low Inventory Items  ==============================")
        console.log("===============================================================================");
        console.log(columnify(res,{columnSplitter: ' | ', align: 'center'}));
        console.log("===============================================================================");
        userPrompt();
    });
};
function addInventory(){
    
};