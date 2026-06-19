import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

const SelectorFecha = ({ fechaSeleccionada, onCambioFecha, requerido = true }) => {

    const setHorasYMinutos = (horas, minutos) => {
        const date = new Date();
        date.setHours(horas);
        date.setMinutes(minutos);
        return date;
    };

    const esDiaHabil = (date) => {
        const dia = date.getDay();
        return dia !== 0 && dia !== 6;
    };

    return (
        <DatePicker
            id="fechayhora"
            selected={fechaSeleccionada}
            onChange={onCambioFecha}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy HH:mm"
            minTime={setHorasYMinutos(8, 0)}
            maxTime={setHorasYMinutos(17, 0)}
            className="form-control w-100"
            placeholderText="Seleccione fecha y hora"
            required={requerido}
            autoComplete="off"
            locale="es"
            filterDate={esDiaHabil}
        />
    );
};

export default SelectorFecha;