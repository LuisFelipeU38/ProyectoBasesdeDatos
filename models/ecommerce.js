const conexion = require("../conexion");

module.exports = {
    login(email,password) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id from clientes where email = ? and password = ?`,
                [email,password],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0]);
                });
        });
    },
    postLogout(email) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id from clientes where email = ?`,
                [email],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    getProductos() {
        return new Promise((resolve, reject) => {
            conexion.query(`select * from productos`,
                [],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    getProductoInfo(id_producto) {
        return new Promise((resolve, reject) => {
            conexion.query(`select * from productos where id = ?`,
                [id_producto],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    getCategorias() {
        return new Promise((resolve, reject) => {
            conexion.query(`select titulo,descripcion from categorias`,
                [],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    getProductoInfoPrecio(id_producto) {
        return new Promise((resolve, reject) => {
            conexion.query(`select precio from productos where id = ?`,
                [id_producto],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    getProductoPrecioEspecifico(precio) {
        return new Promise((resolve, reject) => {
            conexion.query(`select titulo,precio,stock from productos where precio > ? order by precio;`,
                [precio],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    getProductoxCategoria(categorias_titulo) {
        return new Promise((resolve, reject) => {
            conexion.query(`select p.titulo from producto_categorias pc JOIN productos p on pc.productoId = p.id JOIN categorias c on c.id = pc.categoriaId 
            where c.titulo = ?;`,
                [categorias_titulo],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    getCategoriaxProducto(productos_titulo) {
        return new Promise((resolve, reject) => {
            conexion.query(`select c.titulo,c.descripcion from categorias as c join producto_categorias as pc on pc.categoriaId = c.id join productos as p on p.id = pc.productoId
            where p.titulo = ?;`,
                [productos_titulo],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    getProductoxLetra(productos_letra) {
        return new Promise((resolve, reject) => {
            conexion.query(`Select titulo,precio from productos where titulo Like ?; `,
                [productos_letra+'%'],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    getClientes() {
        return new Promise((resolve, reject) => {
            conexion.query(`select nombre,email,password from clientes;`,
                [],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    getOrdenesClientes(id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`select distinct nombre from clientes inner join ordenes on clientes.id = ordenes.clienteId where ordenes.clienteId != ?;`,
                [id_cliente],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    getClientesCarritoProducto() {
        return new Promise((resolve, reject) => {
            conexion.query(`select c.id, c.nombre from clientes as c join carrito as cr on cr.clienteId  = c.id join carrito_productos as cp on cp.carritoId = cr.id;`,
                [],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    getCarrito(id_carrito) {
        return new Promise((resolve, reject) => {
            conexion.query(`select * from carrito where id = ? ;`,
                [id_carrito],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    postCarrito(id_cliente) {
        return new Promise((resolve, reject) => {
            dateCarrito = new Date()
            conexion.query(`insert into carrito (clienteId, createdAt, estado) values (?, ?, 1)`,
                [id_cliente,dateCarrito],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },
    postCarritoProducto(id_carrito,id_producto,cantidad) {
        return new Promise((resolve, reject) => {
            dateCarrito = new Date()
            conexion.query(`insert into carrito_productos (carritoId, productoId, cantidad, activo, createdAt) values (?, ?, ?, 1, ?)`,
                [id_carrito,id_producto,cantidad,dateCarrito],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },
    putCarritoProducto(id_carrito,id_producto,cantidad) {
        return new Promise((resolve, reject) => {
            updateDateCarrito = new Date()
            conexion.query(`update carrito_productos set cantidad = ?, updatedAt = ? where carritoId = ? AND productoId = ?` ,
                [cantidad,updateDateCarrito,id_carrito,id_producto],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },
    getCarritoProductos(id_carrito) {
        return new Promise((resolve, reject) => {
            conexion.query(`select p.titulo from carrito_productos cp JOIN productos p on cp.productoId = p.id JOIN carrito c on c.id = cp.carritoId
            where c.id = ?;`,
                [id_carrito],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    deleteCarritoProductos(id_carrito, id_producto) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from carrito_productos where carritoId = ? AND productoId = ?`,
                [id_carrito,id_producto],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    postOrden(id_cliente) {
        return new Promise((resolve, reject) => {
            createDateOrden = new Date()
            conexion.query(`insert into ordenes (clienteId, createdAt, estado) values (?, ?, 1)`,
                [id_cliente, createDateOrden],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },
    postcrearUsuario(nombre,email,password) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into clientes (nombre, email, password) values (?, ?, ?)`,
                [nombre,email,password],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },
    putDireccionTelefono(direccion,telefono,id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`update clientes set direccion = ? , telefono = ? where id = ?`,
                [direccion,telefono,id_cliente],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },
    deleteClientes(id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from clientes where id = ?`,
                [id_cliente],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
}