const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./credentials.json");
const { notification } = require("./utils/template");
const { transporter } = require("./utils/nodemailer");
const { wpClient } = require("./utils/twilio");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.executeSendingNotifications = functions.pubsub
  .schedule("22 14 * * *") // minuto(0-59) | hora(0-23) | día_del_mes(0-31) | mes(1-12) | día_de_la_semana(0-6 / Dom = 0)
  .timeZone("America/Mexico_City") // America/Mexico_City
  .onRun(async (context) => {
    console.log("Ejecutando envío de notificaciones!");

    const now = new Date();
    const day = now.getDate(); // Día actual
    const lastDayOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();

    const notificationsRef = admin.firestore().collection("notifications");

    // Obtener notificaciones para el día actual
    let snapshot = await notificationsRef.where("notifDay", "==", day).get();
    let docs = snapshot.docs;

    // Si hoy es el último día del mes, también obtenemos notificaciones para los posibles días faltantes 29, 30, y 31
    if (day === lastDayOfMonth) {
      const additionalDays = [29, 30, 31];
      for (const extraDay of additionalDays) {
        // Se obtienen las notificaciones adicionales siempre y cuando el día actual sea menor el día faltante (extraDay). Por ejemplo si el día actual es 30, se omite el día 29 porque ya pasó, se omite el día 30 porque es el día actual y ya se obtuvieron las notificaciones para este (línea 31) y solo se obtienen las notificaciones adicionales para el día 31 (si estas existen) que es el único posible día faltante
        if (day < extraDay) {
          const extraSnapshot = await notificationsRef
            .where("notifDay", "==", extraDay)
            .get();
          docs = docs.concat(extraSnapshot.docs);
        }
      }
    }

    if (docs.length === 0)
      return console.log("No hay notificaciones para el día de hoy!");

    docs.forEach(async (doc) => {
      const data = doc.data();
      console.log(data.email, data.phoneNumber);
      const email = data.email;
      const subject = "Notificación Diaria";
      const phoneNumber = data.phoneNumber;
      const wpMessage = "Notificación por WhatsApp";

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

      try {
        const response = await wpClient.messages.create({
          body: wpMessage,
          from: "whatsapp:+14155238886", // Número de Twilio para WhatsApp
          to: `whatsapp:${phoneNumber}`, // Formato específico para Twilio
        });

        console.log(`Mensaje enviado a ${phoneNumber}: `, response.sid);
      } catch (error) {
        console.error("Error sending WhatsApp message:", error);
      }
    });

    return null;
  });
