select n.stock_name,n.symbol,i.firstName
from nonowned_stock n
join investors i 
on n.user_id=i.id;
-- where user_id = 1;