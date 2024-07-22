const notification = `
    <!DOCTYPE html>
    <html lang="es">

    <head>
        <meta charset="UTF-8">
        <title>Notificación</title>
        <style>
        body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        }

        .container {
        width: 80%;
        margin: auto;
        overflow: hidden;
        }

        h3 {
        margin-bottom: 2rem;
        }

        .content {
        margin-bottom: 2rem;
        }

        .description {
        font-weight: 600;
        font-style: italic;
        }
    </style>
    </head>

    <body>
    <div class="container">
        <h3>Señor Usuario,</h3>
        <section class="content">
        <p>Tiene una nueva notificación:</p>
        <p class="description">Descripción de la notificación</p>
        </section>
        <p>Cordialmente,</p>
        <p>El equipo de Firebase</p>
    </div>
    </body>
</html>
    `;

exports.notification = notification;
