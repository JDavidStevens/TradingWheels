Select o.stock_name, o.symbol, n.stock_name, n.symbol
from owned_stock o
join nonowned_stock n on n.user_id=o.user_id;