create database bamazon;
use bamazon;
create table products(
	item_id integer auto_increment not null,
    product_name varchar(100) null,
    department_name varchar(100) null,
    price decimal(10,2) null,
    stock_quantity integer(10) null,
    primary key (item_id)
);
insert into products (product_name, department_name, price, stock_quantity)
values ("laptop", "electronics", 1099.99, 12);
insert into products (product_name, department_name, price, stock_quantity)
values ("dog food", "pets", 29.99, 50);
insert into products (product_name, department_name, price, stock_quantity)
values ("computer chair", "office", 99.99, 20);
insert into products (product_name, department_name, price, stock_quantity)
values ("necklace", "jewelry", 500, 3);
insert into products (product_name, department_name, price, stock_quantity)
values ("milk", "food", 2.99, 30);
insert into products (product_name, department_name, price, stock_quantity)
values ("laptop charger", "electronics", 49.99, 15);
insert into products (product_name, department_name, price, stock_quantity)
values ("cereal", "food", 4.99, 42);
insert into products (product_name, department_name, price, stock_quantity)
values ("pet leash", "pets", 7.99, 15);
insert into products (product_name, department_name, price, stock_quantity)
values ("hd tv", "electronics", 499.99, 8);
insert into products (product_name, department_name, price, stock_quantity)
values ("index cards", "office", 4.99, 17);
select * from products;
