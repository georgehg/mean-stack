#docker run --name payfastdb -e MYSQL_ROOT_PASSWORD=test123 -p 3306:3306 -d mysql/mysql-server

create database payfast;

use payfast;

GRANT ALL PRIVILEGES ON *.* TO 'root'@'192.168.99.1' IDENTIFIED BY 'test123';

drop table payments;

CREATE TABLE payments (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  forma_de_pagamento varchar(255) NOT NULL,
  valor decimal(10,2) NOT NULL,
  moeda varchar(3) NOT NULL,
  status varchar(255) NOT NULL,
  data DATE,
  descricao text);