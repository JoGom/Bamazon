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
    console.log(`***** Successfully connected to Bamazon inventory as Supervisor ID ${connection.threadId} *****\n`);
    userPrompt();
});

function userPrompt(){
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Product Sales by Department",
            "Create New Department",
            "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Product Sales by Department":
        displayDepartmentSales();
        break;

      case "Create New Department":
        CreateDepartment();
        break; 

      case "Exit":
        console.log(`=====================`);
        console.log(`Thank you come again!`);
        console.log(`=====================`);
        connection.end();
      break;
      }
    });
};

function displayDepartmentSales(){
    
};