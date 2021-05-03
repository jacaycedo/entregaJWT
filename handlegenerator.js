let jwt = require('jsonwebtoken');
let config = require('./config');
let md5 = require('md5')
const { ROLE } = require('./Roles');
var [getUserByName, insertUser] = require("./dbpetitions")

// Clase encargada de la creación del token
class HandlerGenerator {

  login(req, res) {
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;

    // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
    
    getUserByName(username).then(user => {
      
      let mockedUsername = user.username;
      let mockedPassword = user.password;
      // Si se especifico un usuario y contraseña, proceda con la validación
      // de lo contrario, un mensaje de error es retornado
      if (username && password) {

        // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
        // de lo contrario, un mensaje de error es retornado
        if (username === mockedUsername && md5(password) === mockedPassword) {

          // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
          let token = jwt.sign({ username: username, role:user.role },
            config.secret, { expiresIn: '24h' });

          // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });

        } else {

          // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
          res.status(403).send({
            success: false,
            message: 'Incorrect username or password'
          });

        }

      } else {

        // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
        res.status(400).send({
          success: false,
          message: 'Authentication failed! Please check the request'
        });

      }
    });

  }
  register(req, res) {
    let rol;
    switch (req.body.role) {
      case 'admin': rol = ROLE.ADMIN; break;
      case 'manager': rol = ROLE.MANAGER; break;
      default: rol = ROLE.BASIC; break;
    }
    let user;
    user = { username: req.body.username, password: md5(req.body.password), role: rol }
    insertUser(user);
    res.status(200).send("Agregado")
  }
  index(req, res) {

    // Retorna una respuesta exitosa con previa validación del token
    res.json({
      success: true,
      message: 'Index page'
    });

  }
}


module.exports = HandlerGenerator;