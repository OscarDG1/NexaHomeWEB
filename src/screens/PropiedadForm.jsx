import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PropiedadForm.css';
import NavigationBar from './NavigationBar';


function PropiedadForm() {
  const navigate = useNavigate();
  const [propiedad, setPropiedad] = useState({
    ciudad: '',
    provincia: '',
    calle: '',
    numero: '',
    precio: 0,
    metrosCuadrados: 0,
    planta: 0,
    descripcion: '',
    tipoPropiedad: '',
    habitacion: 0,
    bano: 0,
    estado: '',
    orientacion: '',
    ascensor: false,
    parking: false,
    piscina: false,
  });

  const API_BASE_URL = 'http://192.168.0.23:7770';

  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      let newValue = value;

      if (type === 'number') {
        if (isNaN(value) || Number(value) < 0) {
          return;
        }
        newValue = Number(value);
      } else if (type === 'checkbox') {
        newValue = checked;
      }

      setPropiedad({ ...propiedad, [name]: newValue });
    };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Submit iniciado');

      const token = localStorage.getItem('token');
      if (!token) {
          alert('Token no encontrado. Por favor, inicia sesión de nuevo.');
          return;
      }

      try {
          console.log('Enviando datos de la propiedad...');
          const idProperty = await savePropertyAndGetId(token, propiedad);
          if (!idProperty) {
              throw new Error('Error al obtener idProperty');
          }
          console.log('ID de propiedad obtenido:', idProperty);

          if (idProperty && imageFiles.length > 0) {
              console.log('Subiendo imágenes...');
              const imageUploadResponse = await uploadImages(token, idProperty, imageFiles);
              if (!imageUploadResponse.ok) {
                  throw new Error('Error al guardar las imágenes');
              }
              console.log('Imágenes enviadas correctamente');
          } else {
              console.log('No hay imágenes para subir');
          }
         //navigate('/Propiedades');
      } catch (error) {
          console.error('Error al guardar la propiedad:', error);
          alert(`Error al guardar la propiedad: Casas maximas alcanzadas`);
      }
  };

  const savePropertyAndGetId = async (token, propiedad) => {
      console.log('Enviando datos de la propiedad al servidor...');
      const response = await fetch(`${API_BASE_URL}/property`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
          },
          
          body: JSON.stringify(propiedad),
      });

      if (!response.ok) {
          throw new Error('Error al guardar la propiedad');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      return data.Id;
  };

  const uploadImages = async (token, idProperty, imageFiles) => {
      console.log('Subiendo imágenes al servidor...');

      const formData = new FormData();

      imageFiles.forEach((file, index) => {
        formData.append('files', file);
      });

      const response = await fetch(`${API_BASE_URL}/property/uploadimage?idProperty=${idProperty}`, {
          method: 'POST',
          headers: {
              'Authorization': token,
          },
          body: formData,
      });

      console.log('Respuesta de la subida de imágenes:', response);
      return response;
  };


  const renderTipoPropiedadOptions = () => (
    <select name="tipoPropiedad" value={propiedad.tipoPropiedad} onChange={handleChange} className="inputt">
      <option value="">Seleccionar tipo de propiedad</option>
      <option value="casa">Casa</option>
      <option value="piso">Piso</option>
    </select>
  );

  const renderEstadoOptions = () => (
    <select name="estado" value={propiedad.estado} onChange={handleChange} className="inputt">
      <option value="">Seleccionar estado</option>
      <option value="Casi nuevo">Casi nuevo</option>
      <option value="Muy bien">Muy bien</option>
      <option value="Bien">Bien</option>
      <option value="A reformar">A reformar</option>
      <option value="Reformado">Reformado</option>
    </select>
  );

  const renderOrientacionOptions = () => (
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

  return (
    <div>
      <NavigationBar />
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
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
            <div className="input-wrapper">
              <input type="number" className="inputt" name="metrosCuadrados" value={propiedad.metrosCuadrados} onChange={handleChange} required />
              <label className={propiedad.metrosCuadrados ? 'input-label input-label-up' : 'input-label'}>Metros Cuadrados</label>
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
          </div>

          <div className="group">
            <div className="input-wrapper">
              <input type="number" className="inputt" name="planta" value={propiedad.planta} onChange={handleChange} required />
              <label className={propiedad.planta ? 'input-label input-label-up' : 'input-label'}>Planta</label>
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
          </div>

          <div className="group">
            <div className="input-wrapper">
              <textarea className="inputt textarea" name="descripcion" value={propiedad.descripcion} onChange={handleChange} required />
              <label className={propiedad.descripcion ? 'input-label input-label-up' : 'input-label'}>Descripción</label>
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
          </div>

          <div className="group">
            <label>Tipo de Propiedad</label>
            {renderTipoPropiedadOptions()}
          </div>

          <div className="group">
            <div className="input-wrapper">
              <input type="number" className="inputt" name="habitacion" value={propiedad.habitacion} onChange={handleChange} required />
              <label className={propiedad.habitacion ? 'input-label input-label-up' : 'input-label'}>Habitaciones</label>
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
          </div>

          <div className="group">
            <div className="input-wrapper">
              <input type="number" className="inputt" name="bano" value={propiedad.bano} onChange={handleChange} required />
              <label className={propiedad.bano ? 'input-label input-label-up' : 'input-label'}>Baños</label>
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
          </div>

          <div className="group">
            <label>Estado</label>
            {renderEstadoOptions()}
          </div>

          <div className="group">
            <label>Orientación</label>
            {renderOrientacionOptions()}
          </div>

          {propiedad.tipoPropiedad === 'piso' && (
            <div className="group">
              <input type="checkbox" name="ascensor" checked={propiedad.ascensor} onChange={handleChange} className="inputt" />
              <label>Ascensor</label>
            </div>
          )}

          <div className="group">
            <input type="checkbox" name="parking" checked={propiedad.parking} onChange={handleChange} className="inputt" />
            <label>Parking</label>
          </div>

          <div className="group">
            <input type="checkbox" name="piscina" checked={propiedad.piscina} onChange={handleChange} className="inputt" />
            <label>Piscina</label>
          </div>

          <div className="group">
            <input type="file" multiple className="inputt" name="imageFiles" onChange={handleImageChange} />
            <label>Imagen</label>
          </div>

          <div className="group">
            <div className="button btn-container">
              <button type="submit" className="contact-button btn">Registrar Propiedad</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropiedadForm;