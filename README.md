markdown_content = """# Proyecto de Automatización de Pruebas E2E - Swag Labs (SauceDemo)

Este repositorio contiene la suite de pruebas automatizadas End-to-End (E2E) para la aplicación web **SauceDemo** (Swag Labs), un sitio simulado de comercio electrónico utilizado ampliamente para prácticas de control de calidad y automatización de software.

## 👥 Integrantes del Equipo
* **Zoé Andrés Chacón Zavala** (chaconzavalazoeandres@gmail.com)

## 🛠️ Herramienta Utilizada
Para este proyecto se seleccionó **Playwright** (con TypeScript). Las razones principales de esta elección fueron:
* **Velocidad y Aislamiento:** Ejecuta pruebas de forma nativa y rápida utilizando contextos de navegador aislados.
* **Sintaxis Moderna:** Proporciona esperas automáticas (auto-waiting), lo que reduce la fragilidad de las pruebas en comparación con herramientas tradicionales.

## 🌐 Aplicación Web Bajo Pruebas
* **Nombre:** Swag Labs (SauceDemo)
* **URL:** [https://www.saucedemo.com/](https://www.saucedemo.com/)

---

## 📋 Descripción de los 6 Flujos Automatizados

La suite de pruebas cubre escenarios críticos y de valor real para el negocio, asegurando que el flujo transaccional y la experiencia del usuario no se vean interrumpidos:

1. **Inicio de Sesión Exitoso (Autenticación):**
   * **Descripción:** Introduce credenciales válidas (`standard_user`), envía el formulario y verifica que el sistema permita el acceso redirigiendo al usuario al catálogo de productos (`/inventory.html`), validando que el título "Products" sea visible.
   
2. **Validación de Formularios y Mensajes de Error (Seguridad/Validación):**
   * **Descripción:** Intenta realizar el inicio de sesión utilizando un usuario bloqueado (`locked_out_user`). Evalúa de forma estricta que el sistema deniegue el acceso y despliegue el mensaje de error correspondiente en la interfaz de usuario: *\"Sorry, this user has been locked out.\"*.

3. **Creación/Gestión de Información (Agregar al Carrito):**
   * **Descripción:** Simula la selección de un artículo específico dentro del inventario ("Sauce Labs Backpack") y acciona el botón para añadirlo al carrito. Comprueba dinámicamente que el contador del icono del carrito de compras en el DOM cambie su estado de vacío a mostrar el valor numérico `1`.

4. **Navegación y Manipulación del DOM (Filtrado de Productos):**
   * **Descripción:** Interactúa con el componente de ordenamiento (`selectOption`) para cambiar el criterio de visualización a "Price (low to high)" (Precio de menor a mayor). Valida que el algoritmo de ordenamiento del backend/frontend funcione de forma correcta asegurando que el primer producto visible sea efectivamente el de menor precio (`$7.99`).

5. **Proceso Principal del Sistema (Checkout Completo / Compra):**
   * **Descripción:** Representa el flujo de mayor valor del negocio. Realiza el ciclo completo: añade un producto al carrito, navega a la pantalla del carrito, inicia el checkout, completa el formulario de datos de envío (Nombre, Apellido, Código Postal), avanza a la pantalla de revisión y finaliza la orden. Valida que aparezca la pantalla de éxito con el mensaje *\"Thank you for your order!\"*.

6. **Cierre de Sesión (Logout):**
   * **Descripción:** Garantiza la correcta destrucción de la sesión del usuario. Abre el menú lateral de navegación de la aplicación, hace clic en el enlace de cierre de sesión y valida que los tokens o cookies sean removidos devolviendo al usuario a la pantalla de login original (comprobando que el botón de login vuelva a estar visible).

---

## 🚀 Instrucciones de Instalación y Ejecución

Sigue estos pasos para clonar, instalar y ejecutar el proyecto de forma local en tu computadora:

### 1. Clonar el Repositorio
Abre tu terminal y ejecuta el comando para descargar el proyecto desde GitHub:
git clone [https://github.com/zowy4/e2e-flows.spec.git](https://github.com/zowy4/e2e-flows.spec.git)
cd e2e-flows.spec
### 2. Instalar Dependencias de Node.js
Asegúrate de tener Node.js instalado. Luego, instala los módulos necesarios declarados en el archivo package.json:
npm install
### 3. Instalar los Navegadores de Playwright
Playwright requiere descargar binarios de navegadores limpios (Chromium, Firefox, WebKit) para ejecutar las pruebas de forma aislada:
npx playwright install
### 4. Ejecución de las Pruebas
Ejecutar todas las pruebas en segundo plano (Modo Headless):
npx playwright test
Ejecutar las pruebas con interfaz gráfica (Modo UI/Headed):
npx playwright test --ui
Ejecutar una prueba o flujo específico (por ejemplo, el checkout):
npx playwright test -g "Checkout"
### 5. Visualización de Resultados y Reportes
Una vez completadas las pruebas, Playwright genera un reporte interactivo en HTML. Puedes abrirlo con el siguiente comando:
npx playwright show-report
### Evidencia de Ejecución de las Pruebas
A continuación se muestra un ejemplo del resultado esperado en la terminal tras una ejecución exitosa de la suite completa:

Plaintext
Running 6 tests using 1 worker
  ✓  1. Inicio de sesión exitoso (320ms)
  ✓  2. Intento de login con credenciales bloqueadas (210ms)
  ✓  3. Agregar un producto al carrito de compras (450ms)
  ✓  4. Navegación y ordenamiento de productos por precio (380ms)
  ✓  5. Proceso completo de compra (Checkout) (620ms)
  ✓  6. Cierre de sesión (Logout) exitoso (410ms)

  6 passed (2.4s)

  
