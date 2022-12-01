const mysql = require("mysql");
// Coloca aquí tus credenciales
module.exports = mysql.createPool({
  host: "",
  user: "",
  password: "",
  database: "tienda"
});
