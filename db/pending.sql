select  * from pendingOrders
where user_id=$1
order by stock_name asc;