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
        console.log(columnify(res));
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
        console.log(answer.quantity);
        connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?", {item_id: answer.item}, function(err, res){
            if(err) throw err;
            if(parseInt(answer.quantity)>res[0].stock_quantity){
                console.log("insuffecient supply. Only "+res[0].stock_quantity+ " items in stock please reselect.");
                purchaseItem();
            }
            else{
            updateInventory(res[0].item_id, res[0].stock_quantity-answer.quantity);
            console.log("===========================================================================================");
            console.log(`Successfully purchased ${answer.quantity} ${res[0].product_name} at $${res[0].price} a peice!`);
            console.log("===========================================================================================");
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
        userPrompt();
    });
 
};
