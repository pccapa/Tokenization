# Tokenization
El Proyecto está conformado por un desarrollo backend nodejs (paquetes importantes de express js, redis y mysql). 
El Proyecto nodejs está estructurado en
Index.js: la ejecución inicial del Proyecto
Utils: se encuentra las validaciones de la entrada de datos.
Tests: se encuentra el código de test con las validaciones importantes para la ejecución local básica.
Routes: se encuentra las rutas que conforman las urls.
Controller: contiene la lógica de la aplicación.
Schema: contiene la estructura del modelo para poder interactuar con las demás capas.
Repository: es el intermediario entre el controller y la capa de datos.
Database: contiene las conexiones y los métodos de las base de datos redis y mysql. Trabaja conjuntamente con la capa de repositorio mediante una clase de factoría para elegir con que base de datos trabajar. Así que el controlador no sabe qué base de datos se usa.

En el archivo Documentación se encuentra el detalle del proyecto.
