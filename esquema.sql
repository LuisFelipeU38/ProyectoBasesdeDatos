mysql -u root -p

create user "dbuser"@"%" identified with mysql_native_password BY "Eafit2022.";
grant all privileges on ecommerce.* to "dbuser"@"%";
flush privileges;