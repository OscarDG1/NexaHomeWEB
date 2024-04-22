import React, { useState } from 'react';
import '../styles/Propiedad.css';

function PropiedadForm() {
  const [propiedad, setPropiedad] = useState({
    correo: '',
    metroscuadrados: 0,
    habitaciones: 0,
    baños: 0,
    ciudad: '',
    provincia: '',
    calle: '',
    numero: 0,
    precio: 0,
    estado: '',
    parking: false,
    piscina: false,
    tipopropiedad: '',
    planta: 0,
    descripcion: '',
    orientacion: '',
    ascensor: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setPropiedad({ ...propiedad, [name]: newValue });
  };

  const renderTipoPropiedadOptions = () => {
    return (
      <select name="tipopropiedad" value={propiedad.tipopropiedad} onChange={handleChange} className="inputt">
        <option value="">Seleccionar tipo de propiedad</option>
        <option value="casa">Casa</option>
        <option value="piso">Piso</option>
      </select>
    );
  };

  const renderEstadoOptions = () => {
    return (
      <select name="estado" value={propiedad.estado} onChange={handleChange} className="inputt">
        <option value="">Seleccionar estado</option>
        <option value="Casi nuevo">Casi nuevo</option>
        <option value="Muy bien">Muy bien</option>
        <option value="Bien">Bien</option>
        <option value="A reformar">A reformar</option>
        <option value="Reformado">Reformado</option>
      </select>
    );
  };

  const renderOrientacionOptions = () => {
    return (
      <select name="orientacion" value={propiedad.orientacion} onChange={handleChange} className="inputt">
        <option value="">Seleccionar orientación</option>
        <option value="norte">Norte</option>
        <option value="nordeste">Nordeste</option>
        <option value="este">Este</option>
        <option value="sureste">Sureste</option>
        <option value="sur">Sur</option>
        <option value="suroeste">Suroeste</option>
        <option value="oeste">Oeste</option>
        <option value="noroeste">Noroeste</option>
      </select>
    );
  };


  return (
    <form className="form">
      <div className="group">
        <div className="input-wrapper">
          <input type="text" className="inputt" name="correo" value={propiedad.correo} onChange={handleChange} required />
          <label className={propiedad.correo ? 'input-label input-label-up' : 'input-label'}>Correo</label>
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className="group">
        <div className="input-wrapper">
          <input type="number" className="inputt" name="metroscuadrados" value={propiedad.metroscuadrados} onChange={handleChange} required />
          <label className={propiedad.metroscuadrados ? 'input-label input-label-up' : 'input-label'}>Metros Cuadrados</label>
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className="group">
        <div className="input-wrapper">
          <input type="number" className="inputt" name="habitaciones" value={propiedad.habitaciones} onChange={handleChange} required />
          <label className={propiedad.habitaciones ? 'input-label input-label-up' : 'input-label'}>Habitaciones</label>
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className="group">
        <div className="input-wrapper">
          <input type="number" className="inputt" name="baños" value={propiedad.baños} onChange={handleChange} required />
          <label className={propiedad.baños ? 'input-label input-label-up' : 'input-label'}>Baños</label>
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className="group">
        <div className="input-wrapper">
          <input type="text" className="inputt" name="ciudad" value={propiedad.ciudad} onChange={handleChange} required />
          <label className={propiedad.ciudad ? 'input-label input-label-up' : 'input-label'}>Ciudad</label>
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className="group">
        <div className="input-wrapper">
          <input type="text" className="inputt" name="provincia" value={propiedad.provincia} onChange={handleChange} required />
          <label className={propiedad.provincia ? 'input-label input-label-up' : 'input-label'}>Provincia</label>
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className="group">
        <div className="input-wrapper">
          <input type="text" className="inputt" name="calle" value={propiedad.calle} onChange={handleChange} required />
          <label className={propiedad.calle ? 'input-label input-label-up' : 'input-label'}>Calle</label>
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className="group">
        <div className="input-wrapper">
          <input type="number" className="inputt" name="numero" value={propiedad.numero} onChange={handleChange} required />
          <label className={propiedad.numero ? 'input-label input-label-up' : 'input-label'}>Número</label>
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className="group">
        <div className="input-wrapper">
          <input type="number" className="inputt" name="precio" value={propiedad.precio} onChange={handleChange} required />
          <label className={propiedad.precio ? 'input-label input-label-up' : 'input-label'}>Precio</label>
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className="group">
        <label>Estado</label>
        {renderEstadoOptions()}
      </div>

      <div className="group">
        <input type="checkbox" name="parking" checked={propiedad.parking} onChange={handleChange} className="inputt" />
        <label>Parking</label>
      </div>

      <div className="group">
        <input type="checkbox" name="piscina" checked={propiedad.piscina} onChange={handleChange} className="inputt" />
        <label>Piscina</label>
      </div>

      <div className="group">
        <label>Tipo de Propiedad</label>
        {renderTipoPropiedadOptions()}
      </div>

      {propiedad.tipopropiedad === 'piso' && (
        <div className="group">
          <input type="checkbox" name="ascensor" checked={propiedad.ascensor} onChange={handleChange} className="inputt" />
          <label>Ascensor</label>
        </div>
      )}

        <div className="group">
              <div className="input-wrapper">
                <input type="number" className="inputt" name="plantas" value={propiedad.plantas} onChange={handleChange} required />
                <label className={propiedad.plantas ? 'input-label input-label-up' : 'input-label'}>Plantas</label>
                <span className="highlight"></span>
                <span className="bar"></span>
              </div>
            </div>
       <div className="group">
              <div className="input-wrapper">
                <input type="textarea" className="inputt" name="descripcion" value={propiedad.descripcion} onChange={handleChange} required />
                <label className={propiedad.descripcion ? 'input-label input-label-up' : 'input-label'}>Descripción</label>
                <span className="highlight"></span>
                <span className="bar"></span>
              </div>
            </div>

      <div className="group">
        <label>Orientación</label>
        {renderOrientacionOptions()}
      </div>

      <div className="group">
        <button type="submit">Registrar Propiedad</button>
      </div>
    </form>
  );
}

export default PropiedadForm;
