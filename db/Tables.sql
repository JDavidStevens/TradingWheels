Create table investors(
id serial primary key,
username varchar(25),
password varchar(25),
first_name varchar(50),
last_name varchar(75)
)

Create table owned_stock(
    id serial primary key,
    stock_name varchar(25),
    symbol varchar(10),
    shares int,
    purchase_price int,
    user_id int references investors(id)
)

Create table nonowned_stock(
    id serial primary key,
    stock_name varchar(25),
    symbol varchar(10),
    user_id int references investors(id)
)

Create table pendingOrders(
    id serial primary key,
    stock_name varchar(25),
    symbol varchar(10),
    shares int,
    trigger_price int,
    order_type varchar(50),
    trade_type varchar(10)
    user_id int references investors(id)
)

