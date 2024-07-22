const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./credentials.json");
const { notification } = require("./utils/template");
const { transporter } = require("./utils/nodemailer");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.executeSendingNotifications = functions.pubsub
  .schedule("30 16 * * *") // minuto(0-59) | hora(0-23) | día_del_mes(0-31) | mes(1-12) | día_de_la_semana(0-6 / Dom = 0)
  .timeZone("America/Bogota") // America/Mexico_City
  .onRun(async (context) => {
    console.log("Ejecutando envío de notificaciones!");

    const now = new Date();
    const day = now.getDate();

    const notificationsRef = admin.firestore().collection("notifications");
    const snapshot = await notificationsRef.where("notifDay", "==", day).get();

    if (snapshot.empty)
      return console.log("No hay notificaciones para el día de hoy!");

    snapshot.forEach((doc) => {
      const data = doc.data();
      const email = data.email;
      const subject = "Notificación Diaria";

      const mailOptions = {
        from: `"Admin" ${process.env.EMAIL}`,
        to: email,
        subject: subject,
        html: notification,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Correo enviado: " + info.response);
        }
      });
    });

    return null;
  });
