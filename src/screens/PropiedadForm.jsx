import React, { useState } from 'react';
import Propiedad from './styles/Propiedad';

const HouseComponent = ({ onSave }) => {
  const [tipoPropiedad, setTipoPropiedad] = useState('casa');
  const [correo, setCorreo] = useState('');
  const [metrosCuadrados, setMetrosCuadrados] = useState('');
  const [habitaciones, setHabitaciones] = useState('');
  const [baños, setBaños] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState('');
  const [parking, setParking] = useState(false);
  const [piscina, setPiscina] = useState(false);
  const [planta, setPlanta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [orientacion, setOrientacion] = useState('');
  const [ascensor, setAscensor] = useState(false);

  const handleSubmit = () => {
    const propiedadData = {
      correo,
      metroscuadrados: parseInt(metrosCuadrados),
      habitaciones: parseInt(habitaciones),
      baños: parseInt(baños),
      ciudad,
      provincia,
      calle,
      numero: parseInt(numero),
      precio: parseInt(precio),
      estado,
      parking,
      piscina,
      tipopropiedad: tipoPropiedad,
      planta: parseInt(planta),
      descripcion: descripcion || null,
      orientacion: orientacion || null,
      ascensor: tipoPropiedad === 'piso' ? ascensor : false,
    };

    onSave(propiedadData);
  };

  return (
    <div style={PropiedadStyles.container}>
      <div style={PropiedadStyles.form}>
        <h2 style={PropiedadStyles.title}>Formulario de Propiedad</h2>

        <div style={PropiedadStyles.inputContainer}>
          <label htmlFor="correo" style={PropiedadStyles.label}>Correo:</label>
          <input
            type="email"
            id="correo"
            style={PropiedadStyles.input}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        {/* Agrega más campos de entrada aquí según sea necesario */}
        {/* Campos de entrada */}

        <button style={PropiedadStyles.buttonguardar} onClick={handleSubmit}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default HouseComponent;
