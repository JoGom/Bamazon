# Bamazon

## Overview
Bamazon is a command line Node app that takes in orders from customers and deplete stock from the store's inventory through the use of MySQL.The app will take in orders from customers and deplete stock from the store's inventory. Managers can use it check on depleted inventory and to add new inventory. Similiarly, Bamazon can provide a summary of the highest-grossing departments in the store to the supervisor.

## Instruction
Bamazon's main functions are shared between three node apps:

**node bamazonCustomer.js** 
When run, it will show the customer Bamazon's products and give them the option to purchase.
![DEMO](/images/bamazonCustomer1.PNG)
When user selects to PURCHASE AN ITEM it will ask them for an item ID.
![DEMO](/images/bamazonCustomer2.PNG)
It will then ask for an amount that they wish to purchase.
![DEMO](/images/bamazonCustomer3.PNG)
And then give them a confirmation message.
![DEMO](/images/bamazonCustomer4.PNG)
When the user selects EXIT, the app will stop.
![DEMO](/images/bamazonCustomer5.PNG)

**node bamazoneManager.js**
When run it will give the user a menu of options.
![DEMO](/images/manager1.PNG)
When user selects VIEW PRODUCTS the app will show the store inventory.
![DEMO](/images/manager2.PNG)
When VIEW LOW INVENTORY ITEMS is selected it shows items that have 5 or less in stock.
![DEMO](/images/manager3.PNG)
If user wants to ad more iventory they would select ADD TO INVENTORY.
![DEMO](/images/manager4.PNG)
User enters the item ID and amount that they are adding.
![DEMO](/images/manager5.PNG)
![DEMO](/images/manager6.PNG)
User has the option to CREATE A NEW PRODUCT.
![DEMO](/images/manager7.PNG)
Once the user enters all the product's information and the amount in stock it gets added to the inventory.
![DEMO](/images/manager8.PNG)
![DEMO](/images/manager9.PNG)

**node bamazonSupervisor.js**
When run it will give the user a menu of options.
![DEMO](/images/supervisor1.PNG)
When VIEW PRODUCT SALES BY DEPARTMENT is selected it shows created departments with their profits.
![DEMO](/images/supervisor2.PNG)
The user has the option to add more departments to monitor.
![DEMO](/images/supervisor3.PNG)
![DEMO](/images/supervisor4.PNG)













