SEBASTIAN RUSZNER

Es un sitio web de un circuito de carreras ubicado en Belgica. 
Allí podras leer noticias destacadas acerca del circuito, la región, los precios a la suscripcion del boletín semanal y 
las categorías que corren en la pista (Incluida la Formula 1)

En el sitio podras suscribirte desde el footer (PLAN FREE) y te llegará un mail de agradecimiento
Desde la barra de navegación podras crear una cuenta y posteriormente iniciar sesión. Si intentas loguearte sin crear 
una cuenta, el sistema rechazará la peticion por no encontrar tu mail en la base de datos y recargará la pagina de login. 
Una vez registrado, te llegará un email con los datos de inicio de sesión y redireccionará al login. 
Si llegaras a perder este email, podes seleccionar la opcion "Olvide mi contraseña", te llegarán por mail las 
instruciones para crear una nueva y cargará un modal de agradecimiento (Si el mail que ingresas a "Olvide mi contraseña" 
no está registrado, recargará para que vuelvas a ingresar el  mail correctamente)

Por ultimo, desde la pagina contacto puedes escribirle al administrador. Deberas ingresar todos tus datos y el mensaje. 
Al administrador le llegará un mail de aviso de nuevo contacto y tu verás una pagina de agradecimiento

El administrador, desde la seccion en la barra de navegacion "Administrator", podrá ver los contactos y las solicitudes 
del tipo de plan que desean contratar, o bien, dar de baja el plan adquirido. Tambien podra editar algunos campos o eliminarlos

Todos los datos quedan guardados en una base de datos.

NOTA IMPORTANTE: El deploy esta hecho en heroku, pero por alguna razón la base de datos funciona cuando quiere. 
El repositorio una vez descargado e instalado las dependencias, deberá abrirse desde localhost:3030, está configurado con 
la base de datos de heroku, de esa manera funciona casi siempre bien. 
(Aveces se cierra la base de datos y hay que revivir el NPM para que vuelva a despertarse). Si necesita que modifique algunas 
variables y datos para correrlo en una base de datos local, aviseme y lo preparo (Heroku utiliza una 
numeración aleatoria para los id de mis tablas, lo cual me genera problemas y por eso requiere adaptarse)

La sesion iniciada no se mantiene abierta, estue averiguando como hacerlo pero hay cosas que no entiendo (cookies, etc) 


Muchas gracias por todo, nos vemos en la etapa 2 de la diplomatura. 

 
