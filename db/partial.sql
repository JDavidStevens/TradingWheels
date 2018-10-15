update owned_stock 
set shares = $3
where user_id = $1 and id=$2; 