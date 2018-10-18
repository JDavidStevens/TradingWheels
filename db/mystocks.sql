select o.id,o.stock_name,o.symbol,o.shares,o.purchase_price,i.firstName
from owned_stock o
join investors i 
on o.user_id=i.id
order by o.stock_name;