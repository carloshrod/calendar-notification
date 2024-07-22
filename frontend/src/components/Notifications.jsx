import { Button } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";

export const Notifications = ({ notifications, handleDeleteNotification }) => {
  return (
    <div className="notifications">
      <h4>Notificaciones</h4>
      {notifications.length > 0 ? (
        notifications.map((event) => (
          <div
            key={event.id}
            className="d-flex justify-content-between gap-2 ps-1 pe-4 mb-1 bg-light rounded"
          >
            <div className="d-flex flex-column gap-1 p-2">
              <p className="m-0">
                <span className="fw-bold">Email: </span> {event.email}
              </p>
              <p className="m-0">
                <span className="fw-bold">Día del mes: </span> {event.notifDay}
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              className="p-0 d-flex align-items-center h-50 my-auto"
              onClick={() => handleDeleteNotification(event.id)}
            >
              <TiDelete size={18} />
            </Button>
          </div>
        ))
      ) : (
        <p className="py-5 text-center fw-semibold bg-light rounded">
          ¡No hay notificaciones para mostrar!
        </p>
      )}
    </div>
  );
};
