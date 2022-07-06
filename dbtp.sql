
-- Creamos la DB (Crear DB si se desea utilizar una local y no la de heroku)-- 
create database dbtp;

-- Seleccionamos la DB (Si deseas utilizar la de heroku, omitir el paso "CREAR TABLA" y usar "use heroku_b94d852201155b2; una vez conectado a la db y no crear tablas, ya estan creadas." --
use dbtp;

-- Creamos tablas: --

create table planes(
	id int unsigned not null,
    plan varchar(50) not null,
    primary key(id)
);

create table formulario(
	id int unsigned not null auto_increment,
    firstName varchar(80) not null,
    lastName varchar(80) not null,
    username varchar(80),
    email varchar(100) not null,
    address varchar(150) not null,
	address2 varchar(150),
    country varchar(100) not null,
    state varchar(100) not null,
    zip int unsigned not null,
	plan int unsigned not null,
    message varchar(255) not null,
    dataStorage varchar(10) not null,
    beContacted varchar(10),
    metOn varchar(15) not null,
    primary key(id),
    foreign key (plan) references planes(id)
);
create table newsletter(
	id int unsigned not null auto_increment,
    email varchar(100) not null,
    plan int unsigned not null,
    primary key(id),
    foreign key (plan) references planes(id)
);

create table registro(
id int unsigned not null auto_increment,
firstName varchar(100) not null,
email varchar(100) not null,
pass varchar(100) not null,
plan int unsigned not null,
primary key(id),
foreign key (plan) references planes(id)
);


-- LOS ID DE PLANES ME LOS DA HEROKU, NO USAR AUTO INCREMENT, SINO DEBEMOS ADAPTAR VARIAS COSAS DEL CODIGO ---

INSERT INTO PLANES VALUES ( "4", "FREE"); 
INSERT INTO PLANES VALUES ( "14", "BASIC"); 
INSERT INTO PLANES VALUES ( "24", "PREMIUM"); 
INSERT INTO PLANES VALUES ( "34", "PREMIUM D+"); 
INSERT INTO PLANES VALUES ( "44", "CANCEL"); 

