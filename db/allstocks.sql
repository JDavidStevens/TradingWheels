-- select o.stock_name, o.symbol,n.stock_name,n.symbol
select *
from owned_stock o
join nonowned_stock n
on o.user_id = n.user_id
-- where o.user_id= 1 and n.user_id=1;

-- select * from owned_stock;