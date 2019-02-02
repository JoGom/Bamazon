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
            "Create a new product",
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
        createProduct();
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
    inquirer
    .prompt([{
        name: "item",
        type: "input",
        message: "Enter item ID:"
    },
    {
        name: "quantity",
        type: "input",
        message: "How much new inventory?"
    }  
    ])
    .then(function(answer) {
        let query = "SELECT item_id, product_name, stock_quantity FROM products WHERE ?"
        connection.query(query, {item_id: answer.item}, function(err, res){
            if(err) throw err;
            addtoDatabase(res[0].item_id, res[0].stock_quantity+parseInt(answer.quantity));
            console.log("===============================================================================");
            console.log(`Successfully added ${answer.quantity} ${res[0].product_name}(s)!`);
            console.log("===============================================================================");
        });

    });
};

function addtoDatabase(itemId, amount){
    let query = "UPDATE products SET ? WHERE ?";
    connection.query(query, [
        { 
            stock_quantity: amount
        },
        {
            item_id: itemId
        }
    ], function(err, res) {
        userPrompt();
    });
 
};

function createProduct(){
    console.log("hello");
    inquirer
    .prompt([{
        name: "product",
        type: "input",
        message: "Enter product name"
    },
    {
        name: "department",
        type: "input",
        message: "Enter product department (ex. Produce, Electronics, etc.)"
    },
    {
        name: "price",
        type: "input",
        message: "What is the price of the product?"
    },
    {
        name: "quantity",
        type: "input",
        message: "How much new inventory?"
    }
    ])
    .then(function(answer) {
        let query = "INSERT INTO products SET ?";
        connection.query(query, {
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
        }, 
        function(err, res){
            if(err) throw err;
            console.log("===============================================================================");
            console.log(`Successfully added ${answer.quantity} ${answer.product}(s)!`);
            console.log("===============================================================================");
            userPrompt();
        });
    });
};
