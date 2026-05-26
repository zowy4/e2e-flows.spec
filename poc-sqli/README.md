# Prueba de Concepto (PoC) - Inyección SQL (CWE-89)

## 👥 Integrantes del Equipo
* **Zoé Andrés Chacón Zavala** (chaconzavalazoeandres@gmail.com)
* *[Agrega otro integrante aquí si aplica]*

## 📝 Descripción Breve de la PoC
Esta Prueba de Concepto (PoC) demuestra el funcionamiento de una **Inyección SQL (SQLi)**, una vulnerabilidad crítica clasificada en el **OWASP Top 10 (A03:2021 - Injection)** y catalogada bajo el identificador **CWE-89**. 

El proyecto consiste en un servidor web local desarrollado con Node.js y SQLite que contiene un formulario de inicio de sesión vulnerable. La falla de seguridad se produce debido a la concatenación directa de la entrada del usuario en la consulta SQL (`SELECT * FROM users WHERE username = '...'`). 

Esto permite a un atacante introducir el valor `admin' --` en el campo de usuario para comentar el resto de la instrucción SQL, evadiendo completamente la validación de la contraseña y obteniendo acceso no autorizado al sistema.