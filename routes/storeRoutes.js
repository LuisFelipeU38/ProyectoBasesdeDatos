const express = require('express');
const router = express.Router();

const productoModel = require("../models/ecommerce");

router.get('/login', function (req, res, next) {
    productoModel
        .login(req.query['email'], req.query['password'])
        .then(id_customer => {
            if (id_customer)
                return res.status(200).send("Inicio exitoso");
            else 
                return res.status(200).send("Invalid username or password");
        })
        .catch(err => {
            return res.status(200).send("DB Error - Login");
        });

});
router.post('/logout', function (req, res, next) {
    const email  = req.body.email;
    productoModel
        .postLogout(email)
        .then(email => {
            if (email === undefined || email.length == 0)
                return res.status(200).send("Usuario Invalido");
            else 
                return res.status(200).send("Sesion cerrada con exito");
        })
        .catch(err => {
            return res.status(200).send("DB Error - Login");
        });

});
router.get('/productos', function (req, res, next) {
    productoModel
        .getProductos()
        .then(productos => {
            if (productos)
                return res.status(200).send(productos);
            else 
                return res.status(200).send("Unknown Error");
        })
        .catch(err => {
            return res.status(200).send("DB Error - Login");
        });

});
router.get('/productos/:categorias_titulo', function (req, res, next) {
    productoModel
        .getProductoxCategoria(req.params.categorias_titulo)
        .then(results => {
            if (results)
                return res.status(200).send(results);
            else 
                return res.status(200).send("No existen productos para esa categoría");
        })
        .catch(err => {
            return res.status(200).send("No existen productos para esa categoría");
        });

});
router.get('/producto/:productos_titulo', function (req, res, next) {
    productoModel
        .getCategoriaxProducto(req.params.productos_titulo)
        .then(results => {
            if (results)
                return res.status(200).send(results);
            else 
                return res.status(200).send("No existen categorias para ese producto");
        })
        .catch(err => {
            return res.status(200).send("No existen categorias para ese producto");
        });

});
router.get('/productos/:id_productos', function (req, res, next) {
    productoModel
        .getProductoInfo(req.params.id_productos)
        .then(producto => {
            if (producto)
                return res.status(200).send(producto);
            else 
                return res.status(200).send("Producto no Existe");
        })
        .catch(err => {
            return res.status(200).send("DB Error - Login");
        });

});
router.get('/categorias/', function (req, res, next) {
    productoModel
        .getCategorias()
        .then(categoria => {
            if (categoria)
                return res.status(200).send(categoria);
            else 
                return res.status(200).send("No existen categorias");
        })
        .catch(err => {
            return res.status(200).send("DB Error - Login");
        });

});
router.get('/clientes', function (req, res, next) {
    productoModel
        .getClientes()
        .then(clientes => {
            if (clientes)
                return res.status(200).send(clientes);
            else 
                return res.status(200).send("Unknown Error");
        })
        .catch(err => {
            return res.status(200).send("DB Error - Login");
        });

});
router.get('/productos/:id_productos/precio', function (req, res, next) {
    productoModel
        .getProductoInfoPrecio(req.params.id_productos)
        .then(precio => {
            if (precio)
                return res.status(200).send(precio);
            else 
                return res.status(200).send("Precio no Existe");
        })
        .catch(err => {
            return res.status(200).send("DB Error - Login");
        });

});
router.get('/filtroPrecio', function (req, res, next) {
    productoModel
        .getProductoPrecioEspecifico(req.query['precio'])
        .then(precio => {
            if (precio)
                return res.status(200).send(precio);
            else 
                return res.status(200).send("No existe el rango de precio");
        })
        .catch(err => {
            return res.status(200).send("DB Error - Login");
        });

});
router.get('/Ordenes/:id_cliente', function (req, res, next) {
    productoModel
        .getOrdenesClientes(req.params.id_cliente)
        .then(results => {
            if (results)
                return res.status(200).send(results);
            else 
                return res.status(200).send("No existen clientes con ordenes");
        })
        .catch(err => {
            return res.status(200).send("No existen clientes con ordenes");
        });

});
router.get('/ProductosLetra', function (req, res, next) {
    productoModel
        .getProductoxLetra(req.query['productos_letra'])
        .then(results => {
            if (results)
                return res.status(200).send(results);
            else 
                return res.status(200).send("No existen productos que empiecen con esa letra");
        })
        .catch(err => {
            return res.status(500).send(err);
        });

});
router.get('/ClientesCarritoxProducto', function (req, res, next) {
    productoModel
        .getClientesCarritoProducto()
        .then(results => {
            if (results)
                return res.status(200).send(results);
            else 
                return res.status(200).send("No existen clientes con un producto en el carrito");
        })
        .catch(err => {
            return res.status(200).send("No existen clientes con un producto en el carrito");
        });

});
router.get('/qorder/:id_order', function (req, res, next) {
    productoModel
        .qorder(req.params.id_order)
        .then(data_order => {
            if (data_order)
                return res.status(200).send(data_order);
            else 
                return res.status(200).send("id_order no existe");
        })
        .catch(err => {
            return res.status(200).send("DB Error - qorder");
        });

});

router.post('/carrito', function (req, res, next) {
    const id_cliente  = req.body.id_cliente;
    productoModel
        .postCarrito(id_cliente)
        .then(id_carrito => {
            if (id_carrito)
                return res.status(200).send(id_carrito);
            else 
                return res.status(200).send("Unknown Error");
        })
        .catch(err => {
            return res.status(500).send("Error creando el carrito");
        });
});
router.post('/carritoProductos', function (req, res, next) {
    const id_carrito  = req.body.id_carrito;
    const id_producto  = req.body.id_producto;
    const cantidad  = req.body.cantidad;
    productoModel
        .postCarritoProducto(id_carrito,id_producto,cantidad)
        .then(results => {
            if (id_carrito)
                return res.status(200).send(results);
            else 
                return res.status(200).send("Error agregando producto al carrito");
        })
        .catch(err => {
            return res.status(500).send("Error agregando producto al carrito");
        });
});
router.put('/carritoProductos', function (req, res, next) {
    const id_carrito  = req.body.id_carrito;
    const id_producto  = req.body.id_producto;
    const cantidad  = req.body.cantidad;
    productoModel
        .putCarritoProducto(id_carrito,id_producto,cantidad)
        .then(results => {
            if (results)
                return res.status(200).send(results);
            else 
                return res.status(200).send("Error actualizando producto");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando producto");
        });
});
router.delete('/carritoProductos', function (req, res, next) {
    const id_carrito  = req.body.id_carrito;
    const id_producto  = req.body.id_producto;
    productoModel
        .deleteCarritoProductos(id_carrito,id_producto)
        .then(results => {
            if (results)
                return res.status(200).send(results);
            else 
                return res.status(200).send("Error borrando producto");
        })
        .catch(err => {
            return res.status(500).send("Error borrando producto");
        });
});
router.put('/carrito', function (req, res, next) {
    const id_carrito  = req.body.id_carrito;
    productoModel
        .putCarrito(id_carrito)
        .then(id_carrito => {
            if (id_carrito)
                return res.status(200).send(id_carrito);
            else 
                return res.status(200).send("Unknown Error");
        })
        .catch(err => {
            return res.status(500).send("Error creando el carrito");
        });
});
router.get('/carrito/:id_carrito/productos', function (req, res, next) {
    productoModel
        .getCarritoProductos(req.params.id_carrito)
        .then(results => {
                    if (results)
                        return res.status(200).send(results);
                    else 
                        return res.status(200).send("No existen productos para esa categoria");
                })
                .catch(err => {
                    return res.status(200).send("DB Error - Login");
                });
        
});
router.post('/clientesNuevos', function (req, res, next) {
    const nombre  = req.body.nombre;
    const email  = req.body.email;
    const password  = req.body.password;
    productoModel
        .postcrearUsuario(nombre, email, password)
        .then(results => {
            if (results)
                return res.status(200).send(results);
            else 
                return res.status(200).send("Error creando el usuario");
        })
        .catch(err => {
            return res.status(200).send("DB Error - Login");
        });
});
router.put('/clientes', function (req, res, next) {
    const direccion  = req.body.direccion;
    const telefono  = req.body.telefono;
    const id_cliente  = req.body.id_cliente;
    productoModel
        .putDireccionTelefono(direccion,telefono,id_cliente)
        .then(cuentaAct => {
            if (cuentaAct)
                return res.status(200).send(cuentaAct);
            else 
                return res.status(200).send("Error completando el registro");
        })
        .catch(err => {
            return res.status(500).send("Error completando el registro");
        });
});

router.post('/ordenes', function (req, res, next) {
    const id_cliente  = req.body.id_cliente;
    productoModel
        .postOrden(id_cliente)
        .then(results => {
            if (results)
                return res.status(200).send(results);
            else 
                return res.status(200).send("Error creando la orden de compra");
        })
        .catch(err => {
            return res.status(500).send("Error creando la orden de compra");
        });
});
router.delete('/clientesDelete', function (req, res, next) {
    const id_cliente  = req.body.id_cliente;
    productoModel
        .deleteClientes(id_cliente)
        .then(results => {
            if (results)
                return res.status(200).send(results);
            else 
                return res.status(200).send("Error borrando cliente");
        })
        .catch(err => {
            return res.status(500).send("Error borrando cliente");
        });
});
router.post('/comprar', function (req, res, next) {
    const id_carrito  = req.body.id_carrito;
    productoModel.getCarrito(id_carrito).then(results => {
    if (results) {
        const id_cliente = results[0].clienteId;
        productoModel.getCarritoProductos(id_carrito).then(resultsCarritoProductos => {
            if (resultsCarritoProductos) {
                console.log(resultsCarritoProductos);
                const carrito_productos = resultsCarritoProductos;
                productoModel.postOrden(id_cliente).then(resultsOrden => {
                    if (resultsOrden) {
                        console.log(resultsOrden);
                        const id_orden = resultsOrden.insertId;
                        carrito_productos.forEach(element => {
                            productoModel.postOrdenProductos(element.productoId, element.cantidad, id_cliente, id_orden);
                            productoModel.deleteCarritoProductos(id_carrito,element.productoId);
                        });
                        return res.status(200).send("Orden Realizada con exito");
                    } else 
                    return res.status(200).send("No se pudo realizar la orden");
                });
            } else 
                return res.status(200).send("No se encuentra productos en el carrito");
        }).catch(err => {
            return res.status(500).send("Error realizando la compra");
        });;
    } else 
        return res.status(200).send("No se encuentra el carrito");
    }).catch(err => {
        return res.status(500).send("Error realizando la compra");
    });
});
module.exports = router;
