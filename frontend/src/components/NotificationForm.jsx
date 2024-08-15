import dayjs from "dayjs";
import { Button } from "react-bootstrap";

export const NotificationForm = ({
  form,
  setForm,
  selectedDate,
  handleSubmit,
  updatingNotification,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <span className="fw-semibold">Fecha:</span>{" "}
        {dayjs(selectedDate).format("DD/MM/YYYY")}
      </p>
      <p>
        <span className="fw-semibold">Día seleccionado:</span>{" "}
        {dayjs(selectedDate).format("DD")}
      </p>
      <div className="form-group">
        <label htmlFor="email" className="fw-semibold">
          Correo Electrónico:
        </label>
        {/* Input tipo select */}
        <input
          id="email"
          type="email"
          className="form-control mb-3"
          placeholder="email@mail.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          readOnly={updatingNotification}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber" className="fw-semibold">
          Número de teléfono:
        </label>
        <input
          id="phoneNumber"
          type="text"
          className="form-control mb-3"
          value={form.phoneNumber}
          placeholder="+573216549870"
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          required
        />
      </div>
      <div className="text-end">
        <Button type="submit" variant="primary">
          {updatingNotification
            ? "Actualizar N° de Teléfono"
            : "Crear Notificación"}
        </Button>
      </div>
    </form>
  );
};
