delete from nonowned_stock
where id=$2;
select * from nonowned_stock where user_id=$1;