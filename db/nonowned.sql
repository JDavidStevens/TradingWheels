select * from nonowned_stock
where user_id = $1
order by stock_name asc;