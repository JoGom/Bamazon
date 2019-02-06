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
    var query = "SELECT department_id, department_name, over_head_costs, SUM(product_sales) Product_sales, SUM(product_sales) - over_head_costs Total_profits ";
    query += "FROM departments INNER JOIN products USING (department_name) ";
    query += "GROUP BY department_name";
    connection.query(query, function(err, res){
        if(err) throw err;
        console.log("===============================================================================");
        console.log(columnify(res));
        console.log("===============================================================================");
        userPrompt();
    });
};

function CreateDepartment(){
    console.log("hello");
    inquirer
    .prompt([{
        name: "department",
        type: "input",
        message: "Enter department name: "
    },
    {
        name: "cost",
        type: "input",
        message: "Enter the department's over head cost: "
    }
    ])
    .then(function(answer) {
        let query = "INSERT INTO departments SET ?";
        connection.query(query, {
            department_name: answer.department,
            over_head_costs: answer.cost
        }, 
        function(err, res){
            if(err) throw err;
            console.log("===============================================================================");
            console.log(`Successfully added ${answer.department} as a new department!`);
            console.log("===============================================================================");
            userPrompt();
        });
    });
}