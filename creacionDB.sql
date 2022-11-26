CREATE DATABASE tienda;

use tienda;
CREATE TABLE `tienda`.`clientes` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(50) NULL DEFAULT NULL,
	`direccion` VARCHAR(80) NULL,
	`email` VARCHAR(50) NULL,
    `telefono` VARCHAR(15) NULL,
	`password` VARCHAR(32) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `uq_telefono` (`telefono` ASC),
	UNIQUE INDEX `uq_email` (`email` ASC) );
    
CREATE TABLE `tienda`.`productos` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(75) NOT NULL,
  `sku` VARCHAR(100) NOT NULL,
  `precio` FLOAT NOT NULL DEFAULT 0,
  `stock` SMALLINT(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));
    
CREATE TABLE `tienda`.`categorias` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(75) NOT NULL,
  `descripcion` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tienda`.`producto_categorias` (
  `productoId` BIGINT NOT NULL,
  `categoriaId` BIGINT NOT NULL,
  PRIMARY KEY (`productoId`, `categoriaId`),
  INDEX `idx_pc_categorias` (`categoriaId` ASC),
  INDEX `idx_pc_productos` (`productoId` ASC),
  CONSTRAINT `fk_pc_producto`
    FOREIGN KEY (`productoId`)
    REFERENCES `tienda`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_categorias`
    FOREIGN KEY (`categoriaId`)
    REFERENCES `tienda`.`categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
  CREATE TABLE `tienda`.`carrito` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `clienteId` BIGINT NULL DEFAULT NULL,
  `estado` SMALLINT(6) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_carrito_clientes` (`clienteId` ASC),
  CONSTRAINT `fk_carrito_clientes`
    FOREIGN KEY (`clienteId`)
    REFERENCES `tienda`.`clientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
	CREATE TABLE `tienda`.`carrito_productos` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `productoId` BIGINT NOT NULL,
  `carritoId` BIGINT NOT NULL,
  `cantidad` SMALLINT(6) NOT NULL DEFAULT 0,
  `activo` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_carrito_productos_productos` (`productoId` ASC),
  CONSTRAINT `fk_carrito_productos_productos`
	FOREIGN KEY (`productoId`)
	REFERENCES `tienda`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
ALTER TABLE `tienda`.`carrito_productos` 
ADD INDEX `idx_carrito_productos_carrito` (`carritoId` ASC);
ALTER TABLE `tienda`.`carrito_productos` 
ADD CONSTRAINT `fk_carrito_productos_carrito`
  FOREIGN KEY (`carritoId`)
  REFERENCES `tienda`.`carrito` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
    
   CREATE TABLE `tienda`.`ordenes` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `clienteId` BIGINT NULL DEFAULT NULL,
  `estado` SMALLINT(6) NOT NULL DEFAULT 0,
  `total` FLOAT NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_ordenes_clientes` (`clienteId` ASC),
  CONSTRAINT `fk_ordenes_clientes`
    FOREIGN KEY (`clienteId`)
    REFERENCES `tienda`.`clientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION); 
  
  CREATE TABLE `tienda`.`ordenes_productos` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `productoId` BIGINT NOT NULL,
  `ordenId` BIGINT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_ordenes_productos_productos` (`productoId` ASC),
  CONSTRAINT `fk_ordenes_productos_productos`
    FOREIGN KEY (`productoId`)
    REFERENCES `tienda`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    ALTER TABLE `tienda`.`ordenes_productos` ADD COLUMN cantidad SMALLINT;

ALTER TABLE `tienda`.`ordenes_productos` 
ADD INDEX `idx_ordenes_productos_ordenes` (`ordenId` ASC);
ALTER TABLE `tienda`.`ordenes_productos` 
ADD CONSTRAINT `fk_ordenes_productos_ordenes`
  FOREIGN KEY (`ordenId`)
  REFERENCES `tienda`.`ordenes` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

INSERT INTO clientes (nombre,direccion,email,telefono,password) VALUES ('Alverth','Av.poblado Calle 44','Alverth@gmail.com',3334556,'12345');
INSERT INTO clientes (nombre,direccion,email,telefono,password) VALUES ('Carlos','Av.regional Calle 13','Carlos@gmail.com',3324456,'12345');
INSERT INTO clientes (nombre,direccion,email,telefono,password) VALUES ('Cristiano','Av.ayacucho Calle 65','Cristiano@gmail.com',3334456,'12345');
INSERT INTO clientes (nombre,direccion,email,telefono,password) VALUES ('Lionel','Av.nutibara Calle 23','Lionel@gmail.com',3234556,'12345');
INSERT INTO clientes (nombre,direccion,email,telefono,password) VALUES ('David Mauricio','Av.palmas Calle 30','Davidmauricio@gmail.com',3134856,'12345');
INSERT INTO clientes (nombre,direccion,email,telefono,password) VALUES ('Sara','Av.boulerias Calle 70','Sara@gmail.com',3324559,'12345');
INSERT INTO clientes (nombre,direccion,email,telefono,password) VALUES ('Andres','Av.43a Calle 28','Andres@gmail.com',3334577,'12345');
INSERT INTO clientes (nombre,direccion,email,telefono,password) VALUES ('Helmuth','Av.guayabal Calle 10','Helmuth@gmail.com',3322556,'12345');
INSERT INTO clientes (nombre,direccion,email,telefono,password) VALUES ('Edwin','Av.vegas Calle 12','Edwin@gmail.com',3334876,'12345');
INSERT INTO clientes (nombre,direccion,email,telefono,password) VALUES ('Felipe','Av.jardin Calle 69','Felipe@gmail.com',3332476,'12345');

INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Computador HP','CP_220',220,5);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Televisor Samsung','TS_650',650,3);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Silla roja','CP_200',200,4);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Maquillaje Loreal','ML_999',9.99,3);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Microondas Kalley','MK_40',40,5);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Diademas Sony','DS_100',100,3);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Conjunto Adidas','CA_450',450,6);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Zapatos negros puma','ZP_105',105,10);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Bicicleta Electrica','BE_300',300,3);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Sofa Cama','SC_16999',169.99,8);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Reloj Rolex','RR_200',200,4);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Cama infantil','CI_22999',229.99,7);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Mancuerna 5kg','MC_2499',24.99,14);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Laptop Gamer Asus','LGA_350',350,11);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Blusa roja','BR_799',7.99,35);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Cargador Iphone','CI_50',50,12);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Monitor Asus Tuf Gaming','MATG_250',250,3);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Arbol de navidad','AN_14999',149.99,8);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Leds navideños','LN_20',20,40);
INSERT INTO productos (titulo,sku,precio,stock)  VALUES ('Dualschosk PS4','DP_6999',69.99,10);

INSERT INTO categorias (titulo,descripcion) VALUES ('Movilidad','Bicicletas, patinetas y scooters electricas');
INSERT INTO categorias (titulo,descripcion) VALUES ('Dormitorio','Desde ropa de cama, colchones y tipos de cama');
INSERT INTO categorias (titulo,descripcion) VALUES ('Electrodomesticos','Los mejores productos para el hogar desde neveras,microondas,etc.');
INSERT INTO categorias (titulo,descripcion) VALUES ('Relojes y accesorios','Bisuteria y joyeria, accesorios para hombre y mujer');
INSERT INTO categorias (titulo,descripcion) VALUES ('Moda','Ropa para todas las personas');
INSERT INTO categorias (titulo,descripcion) VALUES ('Navidad','Productos para temporada navideña');
INSERT INTO categorias (titulo,descripcion) VALUES ('Tecnología','Todos los aparatos tecnologicos deseados');
INSERT INTO categorias (titulo,descripcion) VALUES ('Deportes','Accesorios y aparatos para el deporte');
INSERT INTO categorias (titulo,descripcion) VALUES ('Belleza','Productos para belleza y el cuidado personal');
INSERT INTO categorias (titulo,descripcion) VALUES ('Inmuebles','Muebles para tu hogar');

INSERT INTO producto_categorias (productoId,categoriaId) VALUES (1,7);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (2,7);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (3,10);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (4,9);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (5,3);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (6,7);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (7,5);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (8,5);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (9,1);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (10,10);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (11,4);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (12,2);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (13,8);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (14,7);
INSERT INTO producto_categorias(productoId,categoriaId) VALUES (15,5);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (16,7);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (17,7);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (18,6);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (19,6);
INSERT INTO producto_categorias (productoId,categoriaId) VALUES (20,7);