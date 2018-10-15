delete from nonowned_stock
where user_id=$1 and id=$2;
select * from nonowned_stock where user_id=$1;