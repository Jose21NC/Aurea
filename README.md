# Áurea Marketplace

**El primer marketplace en Nicaragua que une proveedores y clientes a través de una experiencia de compra digital, innovadora y confiable.**

[![Estado del Proyecto](https://img.shields.io/badge/estado-en%20desarrollo-yellowgreen)](https://github.com/Jose21NC/Aurea/)
[![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)](/LICENSE)

---

## 🎯 ¿Qué es Áurea?

**Áurea** es una aplicación móvil de e-commerce diseñada para transformar el comercio digital en Nicaragua. Nuestra misión es derribar las barreras de desconfianza y tecnología, creando un ecosistema donde los negocios locales pueden prosperar y los clientes pueden comprar con total certeza.

### ❗ El Problema

El comercio digital en Nicaragua enfrenta dos grandes desafíos:
* **Para el cliente:** La desconfianza al comprar en línea, sin saber si el producto final será como el de la foto.
* **Para el negocio:** La falta de visibilidad y de herramientas tecnológicas para competir, gestionar inventarios y alcanzar a más clientes.

### ✨ La Solución

Áurea resuelve estos desafíos con una plataforma "todo en uno" que ofrece:
* **Confianza Absoluta:** Con nuestro **probador virtual con IA**, los usuarios pueden "probarse" productos desde su telefono, reduciendo la incertidumbre y las devoluciones.
* **Crecimiento para Negocios:** Brindamos a los proveedores un panel de control para gestionar inventarios y ventas de forma automatizada, dándoles acceso a un mercado masivo.

## 🚀 Características Principales

* **👚 Probador Virtual con IA:** Permite a los usuarios visualizar cómo les quedarían prendas de vestir y otros productos usando su celular.
* **🏪 Perfiles de Vendedor y Catálogos:** Cada negocio afiliado puede personalizar su tienda, subir sus productos y gestionar su marca.
* **📈 Dashboard de Gestión:** Un panel intuitivo para que los vendedores automaticen su inventario, procesen órdenes y analicen sus ventas.
* **🤝 Comunidad y Reseñas:** Un sistema de calificación y reseñas que fomenta la confianza y crea una comunidad entre compradores y vendedores.
* **🛒 Experiencia de Compra Fluida:** Un proceso de descubrimiento, prueba y pago simple, rápido y seguro.

## 🛠️ Tecnologías Utilizadas
- **Frontend:** HTML5, CSS3, JavaScript Moderno (ES Modules) y Tailwind CSS.
- **Backend as a Service (BaaS):** Firebase
  - **Base de Datos:** Cloud Firestore
  - **Autenticación:** Firebase Authentication
  - **Almacenamiento:** Firebase Storage (para imágenes de usuario)
  - **Serverless:** Cloud Functions (para el proxy de la API de IA)
- **Inteligencia Artificial:** API externa de [Glam.ai](https://glam.ai/) para la funcionalidad de probador virtual.

## Estructura del Proyecto
/ (raíz del proyecto)
|
|-- index.html              # Página principal con el catálogo de productos.
|-- product-detail.html     # Vista detallada de un producto individual.
|-- login.html              # Página de inicio de sesión.
|-- register.html           # Página de registro de nuevos usuarios.
|-- uploader.html           # Herramienta interna para subir productos en lote.
|-- products-data.js        # Archivo de datos para la herramienta de subida.
|-- firebase-config.js      # Módulo para la configuración e inicialización de Firebase.
|
|-- /functions/
|   |-- index.js            # Código de la Cloud Function que actúa como proxy.
|   |-- package.json        # Dependencias de la Cloud Function.

## Estado del Proyecto

Actualmente, el proyecto se encuentra en una fase de prototipado funcional. Las siguientes características están implementadas:
- Arquitectura de frontend modular.
- Autenticación de usuarios.
- Visualización de catálogo y detalle de productos desde Firestore.
- Sistema de reseñas.
- Integración funcional del probador virtual con IA a través de un proxy seguro.

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## 📧 Contacto

José - [@Jose21NC](https://github.com/Jose21NC)

Enlace del Proyecto: [https://github.com/Jose21NC/Aurea](https://github.com/Jose21NC/Aurea)<div align="center">
