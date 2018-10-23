delete from nonowned_stock
where id=$1;
return * from nonowned_stock;