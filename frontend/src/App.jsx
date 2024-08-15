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
  updateNotification,
} from "./firebase";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const initialForm = {
  email: "",
  phoneNumber: "",
};

function App() {
  const [notifications, setNotifications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const { email, phoneNumber } = form;
  const [updatingNotification, setUpdatingNotification] = useState(false);

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
    if (selectedDate && email && phoneNumber) {
      if (!updatingNotification) {
        const notifHour = 12;

        const newNotification = {
          title: email,
          email,
          phoneNumber,
          notifDay: Number(dayjs(selectedDate).format("DD")),
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
      } else {
        await updateNotification(form);
        const newData = notifications.map((notif) => {
          return notif.id === form.id ? form : notif;
        });
        setNotifications(newData);
        setUpdatingNotification(false);
      }
      setSelectedDate(null);
      setForm(initialForm);
      setShowModal(false);
    }
  };

  const handleDeleteNotification = async (notificactionId) => {
    await deleteNotification(notificactionId);
    const updatedNotifications = notifications.filter(
      (notif) => notif.id !== notificactionId
    );
    setNotifications(updatedNotifications);
    setForm(initialForm);
  };

  const handleUpdateNotification = (notificationId) => {
    setUpdatingNotification(true);
    const notificationToEdit = notifications.find((notif) => {
      return notif.id === notificationId;
    });
    setSelectedDate(notificationToEdit.start);
    setForm(notificationToEdit);
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
    setForm(initialForm);
    setUpdatingNotification(false);
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
        handleUpdateNotification={handleUpdateNotification}
      />
      <CustomModal showModal={showModal} onHideModal={onHideModal}>
        <NotificationForm
          form={form}
          setForm={setForm}
          selectedDate={selectedDate}
          handleSubmit={handleSubmit}
          updatingNotification={updatingNotification}
        />
      </CustomModal>
    </div>
  );
}

export default App;
