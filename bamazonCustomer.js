const mysql = require("mysql");
const columnify = require("columnify");
const inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: "localhost",
    port:  3306,
    user: "root",
    password: "1027985.Gg@",
    database: "bamazon"
});

connection.connect(function(err){ 
    if(err) throw err;
    console.log(`**** Successfully connected to Bamazon inventory as customer ID ${connection.threadId} *****\n`);
    displayInventory();
});

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

function displayInventory(){
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res){
        if(err) throw err;

        console.log("===============================================================================");
        console.log(columnify(res,{columnSplitter: ' | ', align: 'center'}));
        console.log("===============================================================================");

        userPrompt();
    });
};

//function that prompts user to purchase an item based on ID and also an amount they wish to purchase
function purchaseItem(){
    inquirer
    .prompt([{
      name: "item",
      type: "input",
      message: "Enter item ID you wish to purchase:"
    },
    {
      name: "quantity",
      type: "input",
      message: "Enter amount you wish to purchase:"
    }  
    ])
    .then(function(answer) {
        connection.query("SELECT * FROM products WHERE ?", {item_id: answer.item}, function(err, res){
            if(err) throw err;
            if(parseInt(answer.quantity)>res[0].stock_quantity){
                console.log("===============================================================================");
                console.log("insuffecient supply. Only "+res[0].stock_quantity+ " items in stock please reselect.");
                console.log("===============================================================================");
                purchaseItem();
            }
            else{
            updateInventory(res[0].item_id, res[0].stock_quantity-parseInt(answer.quantity));
            let transactionTotal = Math.round(100*(res[0].price * parseInt(answer.quantity)))/100;
            totalSales(res[0].item_id, res[0].product_sales, transactionTotal);
            console.log("===============================================================================");
            console.log(`Successfully purchased ${answer.quantity} ${res[0].product_name}(s) for a total of $${transactionTotal} at $${res[0].price} a peice!`);
            console.log("===============================================================================");
            };
        });

    });
};

//function that updates the quantity in stock based on amount bought
function updateInventory(itemId, inStock){
    let query = "UPDATE products SET ? WHERE ?";
    connection.query(query, [
        { 
            stock_quantity: inStock 
        },
        {
            item_id: itemId
        }
    ], function(err, res) {
        
    });
};

function totalSales(itemId, currentSales, transactionTotal){
    let query = "UPDATE products SET ? WHERE ?";
    newTotal = currentSales + transactionTotal;
    connection.query(query, [
        { 
            product_sales: newTotal
        },
        {
            item_id: itemId
        }
    ], function(err, res) {
        userPrompt();
    });
};
