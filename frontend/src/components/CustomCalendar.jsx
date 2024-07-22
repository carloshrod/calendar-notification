import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import { Button } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";
import "react-big-calendar/lib/css/react-big-calendar.css";

dayjs.locale({
  name: "es-mx",
  months:
    "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
      "_"
    ),
  monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),
  weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
  weekdaysShort: "Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),
  weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
});
const localizer = dayjsLocalizer(dayjs);

export const CustomCalendar = ({
  events,
  handleDateSelect,
  handleDeleteNotification,
}) => {
  const EventComponent = ({ event }) => (
    <div className="d-flex flex-wrap justify-content-around align-items-center">
      <span className="small">{event.title}</span>
      <Button
        variant="danger"
        size="sm"
        className="p-0 d-flex align-items-center"
        onClick={() => handleDeleteNotification(event.id)}
      >
        <TiDelete size={18} />
      </Button>
    </div>
  );

  return (
    <Calendar
      className="calendar"
      selectable
      events={events}
      localizer={localizer}
      onSelectSlot={handleDateSelect}
      onSelectEvent={(event) => console.log(event)}
      components={{
        event: EventComponent,
      }}
      views={["month"]}
      messages={{
        previous: "Anterior",
        next: "Siguiente",
        today: "Hoy",
      }}
    />
  );
};
