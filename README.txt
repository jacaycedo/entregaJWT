En este ejercicio se realiza una conexión a una base de datos local con mongoDB. 
Existen 3 roles, administrador, manager y usuario básico.
El unico que puede crear a otros usuarios es el adminitrador.
Las página de administrador está solo diponible para los administradorres de la aplicación.
La de mantenimiento para los gerentes
El de inicio normal para los usuarios basicos

La contraseñas se guardan por medio del cifrado MD5 y de la misma forma se revisa que esten correctas.
