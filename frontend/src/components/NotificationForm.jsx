import dayjs from "dayjs";
import { Button } from "react-bootstrap";

export const NotificationForm = ({
  email,
  setEmail,
  selectedDate,
  handleSubmit,
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="text-end">
        <Button type="submit" variant="primary">
          Crear Evento
        </Button>
      </div>
    </form>
  );
};
