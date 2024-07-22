import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  CustomCalendar,
  Notifications,
  CustomModal,
  NotificationForm,
} from "./components";
import {
  addNotification,
  deleteNotification,
  getNotification,
} from "./firebase";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const [time, setTime] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotification();

      const formattedNotifications = data.map((notif) => ({
        ...notif,
        start: dayjs.unix(notif.start.seconds).toDate(),
        end: dayjs.unix(notif.end.seconds).toDate(),
      }));

      setNotifications(formattedNotifications);
    };

    fetchNotifications();
  }, []);

  const handleDateSelect = ({ start }) => {
    setSelectedDate(start);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDate && email) {
      // const [hour, minute] = time.split(":").map(Number);
      const notifHour = 8;

      const newNotification = {
        title: email,
        email,
        notifDay: Number(dayjs(selectedDate).format("DD")),
        // time: time,
        start: dayjs(selectedDate)
          .set("hour", notifHour)
          .set("minute", 0)
          .set("second", 0)
          .toDate(),
        end: dayjs(selectedDate).endOf("day").toDate(),
        allDay: true,
      };

      const notificationCreated = await addNotification(newNotification);
      setNotifications([...notifications, notificationCreated]);

      setSelectedDate(null);
      setEmail("");
      setShowModal(false);
    }
  };

  const handleDeleteNotification = async (notificactionId) => {
    await deleteNotification(notificactionId);
    const updatedNotifications = notifications.filter(
      (notif) => notif.id !== notificactionId
    );
    setNotifications(updatedNotifications);
  };

  return (
    <div className="wrapper">
      <CustomCalendar
        events={notifications}
        handleDateSelect={handleDateSelect}
        handleDeleteNotification={handleDeleteNotification}
      />
      <Notifications
        notifications={notifications}
        handleDeleteNotification={handleDeleteNotification}
      />
      <CustomModal showModal={showModal} setShowModal={setShowModal}>
        <NotificationForm
          email={email}
          setEmail={setEmail}
          // time={time}
          // setTime={setTime}
          selectedDate={selectedDate}
          handleSubmit={handleSubmit}
        />
      </CustomModal>
    </div>
  );
}

export default App;
