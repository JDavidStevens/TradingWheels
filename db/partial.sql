update owned_stock 
set shares = $2, purchase_price =$3
where id=$1; 