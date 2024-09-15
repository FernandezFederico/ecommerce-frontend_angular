# Frontend de E-commerce (Stack MEAN)
Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.0.6.

## Funcionalidades

- **Gestión de Roles**:
  - **Usuarios**: Permite ingresar al sistema como usuario, vendedor o encargado. Cada rol tiene permisos específicos y accesos diferentes dentro de la aplicación.
- **Gestión de Usuarios**:
  - Agregar, quitar y modificar usuarios según el rol asignado.
- **Gestión de Productos**:
  - Agregar, quitar y modificar productos según el rol asignado.
  - Secciones por categorías para una mejor organización de los productos.
  - Filtrado de productos por diferentes criterios para facilitar la búsqueda.
- **Carrito de Compras**:
  - Agregar, quitar y editar productos en el carrito de compras.
  - Antes de finalizar la compra, los usuarios pueden verificar los detalles en un módulo de checkout.
- **Administración de Productos y Usuarios**:
  - Visualización en tablas con funcionalidades de filtrado, ordenado y paginado para una gestión eficiente.

## Tecnologías
- **Angular**: Framework para construir aplicaciones web dinámicas y de una sola página (SPA).
- **RxJS**: Biblioteca para la programación reactiva usando observables, que facilita la gestión de datos asíncronos.
- **Bootstrap**: Framework CSS para diseñar interfaces web.
- **Angular Material**: Conjunto de componentes de UI que implementa los principios del Material Design de Google.
- **PrimeNG**: Biblioteca de componentes UI ricos para Angular.
- **SweetAlert2**: Librería para mostrar alertas y mensajes estilizados y personalizables.
- **TypeScript**: Superset de JavaScript que añade tipado estático y otros beneficios.

## Mejoras Futuras
- **Mejoras en los environments**: Refinar y optimizar las configuraciones de entorno para diferentes fases del desarrollo y producción.
- **Implementar pasarela de pago**: Integrar una solución de pago para procesar transacciones en línea.
- **Pruebas unitarias**: Añadir pruebas unitarias para asegurar la calidad y estabilidad del código.
- **Mejoras en rendimientos**: Optimizar el rendimiento general de la aplicación para una mejor experiencia de usuario.
- **NGRX**: Implementar NGRX para manejar el estado de la aplicación de manera más eficiente.
- **Actualización incremental**: Implementar actualizaciones incrementales para mejorar el proceso de despliegue y actualización de la aplicación.
- **Importación y exportación de plantillas a Excel**: Añadir funcionalidades para importar y exportar datos en formato Excel para facilitar el manejo de información.

## Servidor de desarrollo

Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.

## Generación de código

Ejecuta `ng generate component nombre-del-componente` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construcción

Ejecuta `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Ejecución de pruebas unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## Ejecución de pruebas end-to-end

Ejecuta `ng e2e` para ejecutar las pruebas end-to-end utilizando una plataforma de tu elección. Para usar este comando, primero debes agregar un paquete que implemente capacidades de pruebas end-to-end.

## Ayuda adicional

Para obtener más ayuda sobre Angular CLI, usa `ng help` o consulta la [Descripción general y referencia de comandos de Angular CLI](https://angular.io/cli).

## Backend
- El backend de este proyecto está desarrollado con Node.js y Express. Puedes encontrar el enlace [aquí](https://github.com/FernandezFederico/ecommerce-backend_express).

