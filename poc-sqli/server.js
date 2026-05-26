// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// 1. Configuramos una base de datos en memoria
const db = new sqlite3.Database(':memory:');

// 2. Creamos una tabla de usuarios y agregamos un usuario administrador
db.serialize(() => {
    db.run("CREATE TABLE users (id INT, username TEXT, password TEXT)");
    db.run("INSERT INTO users VALUES (1, 'admin', 'super_secreto_123')");
});

// Middleware para poder leer los datos de los formularios HTML
app.use(express.urlencoded({ extended: true }));

// 3. Ruta principal: Muestra el formulario de inicio de sesión
app.get('/', (req, res) => {
    res.send(`
        <h2>Prueba de Concepto - CWE-89: Inyección SQL</h2>
        <form action="/login" method="POST">
            Usuario: <input type="text" name="username"><br><br>
            Contraseña: <input type="password" name="password"><br><br>
            <button type="submit">Entrar</button>
        </form>
        <p><i>Intenta iniciar sesión como administrador sin saber la contraseña.</i></p>
    `);
});

// 4. Ruta de validación (VULNERABLE)
app.post('/login', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;

    // 🚨 AQUÍ ESTÁ LA VULNERABILIDAD (CWE-89) 🚨
    // Estamos concatenando los datos del usuario directamente en la consulta de la base de datos.
    const query = "SELECT * FROM users WHERE username = '" + user + "' AND password = '" + pass + "'";
    
    // Ejecutamos la consulta
    db.get(query, (err, row) => {
        if (err) {
            res.send("Error en la base de datos");
            return;
        }

        if (row) {
            // Si encuentra un registro, permite el paso
            res.send(`
                <h1 style="color: green;">¡Acceso Concedido!</h1>
                <p>Bienvenido, <b>${row.username}</b>.</p>
                <p style="background-color: #eee; padding: 10px;">Consulta ejecutada en DB:<br><code>${query}</code></p>
                <a href="/">Volver</a>
            `);
        } else {
            // Si no coincide, rechaza el acceso
            res.send(`
                <h1 style="color: red;">Acceso Denegado</h1>
                <p style="background-color: #eee; padding: 10px;">Consulta ejecutada en DB:<br><code>${query}</code></p>
                <a href="/">Volver</a>
            `);
        }
    });
});

// Iniciamos el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor PoC vulnerable corriendo en http://localhost:3000');
});