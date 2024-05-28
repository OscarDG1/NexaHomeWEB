import React, { useState } from 'react';
import '../styles/Propiedades.css';
import NavigationBar from './NavigationBar';
import casa from '../assets/casa.jpg';
import bano from '../assets/bano.jpg';
import superficie from '../assets/superficie.png';
import habitacion from '../assets/habitacion.png';
import Modal from 'react-modal';

function MiPropiedad() {
  const navigate = useNavigate();
  const [miPropiedad, setMiPropiedad] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const API_BASE_URL = 'http://192.168.0.23:7770';

  useEffect(() => {
    const fetchMiPropiedad = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No estás logueado. Por favor, inicia sesión.');
        navigate('/');
        return;
      }

      try {
        console.log('Obteniendo información de la propiedad...');
        const response = await fetch(`${API_BASE_URL}/property/myProperty`, {
          method: 'GET',
          headers: {
            'Authorization': token,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener la propiedad');
        }

        const data = await response.json();
        console.log('Información de la propiedad obtenida:', data);
        setMiPropiedad(data);
      } catch (error) {
        console.error('Error al obtener la propiedad:', error);
        alert(`Error al obtener la propiedad: ${error.message}`);
        navigate('/');
      }
    };

    fetchMiPropiedad();
  }, [navigate]);

  if (!miPropiedad) {
    return (
      <div>
        <NavigationBar />
        <div className="msg">
          <p className="msg">Cargando propiedades...</p>
        </div>
      </div>
    );
  }

  if (!miPropiedad || Object.keys(miPropiedad).length === 0) {
    return (
      <div>
        <NavigationBar />
        <div className="msg">
          <p className="msg">No tienes propiedades registradas.</p>
        </div>
      </div>
    );
  }

  const openModal = (property) => {
    setSelectedProperty(property);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <NavigationBar />
      <div className="property-card" onClick={() => openModal(miPropiedad)}>
        <div className="property-image-container">
          {miPropiedad.imagePath && miPropiedad.imagePath.length > 0 ? (
            <img src={miPropiedad.imagePath[0]} alt="Imagen de la casa" className="property-image" />
          ) : (
            <div className="no-image">No hay imagen disponible</div>
          )}
        </div>
        <div className="property-details">
          <div className="property-texts">
            <span className="property-price">
              <span className="price-bold">{miPropiedad.precio ? `${miPropiedad.precio}€` : 'Precio no disponible'}</span>
            </span>
            <span className="property-meters">
              <span className="price-bold">Superficie:</span>&nbsp;{miPropiedad.metrosCuadrados ? `${miPropiedad.metrosCuadrados} m²` : 'Superficie no disponible'}
            </span>
            <span className="property-bedrooms">
              <span className="price-bold">Habitaciones:</span>&nbsp;{miPropiedad.habitacion || 'No disponible'}
              {miPropiedad.habitacion && <img src={habitacion} alt="Icono de habitaciones" className="property-icon" />}
            </span>
            <span className="property-bathrooms">
              <span className="price-bold">Baños:</span>&nbsp;{miPropiedad.bano || 'No disponible'}
              {miPropiedad.bano && <img src={bano} alt="Icono de baños" className="property-icon" />}
            </span>
          </div>
          <button className="contact-button btn" onClick={() => alert('Contacto no implementado')}>Contactar</button>
        </div>
      </div>
      {selectedProperty && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Detalles de la propiedad"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>{selectedProperty.calle} {selectedProperty.numero}, {selectedProperty.ciudad}</h2>
          <p>Precio: {selectedProperty.precio}€</p>
          <p>Superficie: {selectedProperty.metrosCuadrados} m²</p>
          <p>Habitaciones: {selectedProperty.habitacion}</p>
          <p>Baños: {selectedProperty.bano}</p>
          <p>Ciudad: {selectedProperty.ciudad}</p>
          <p>Provincia: {selectedProperty.provincia}</p>
          <p>Calle: {selectedProperty.calle}</p>
          <p>Número: {selectedProperty.numero}</p>
          <p>Planta: {selectedProperty.planta}</p>
          <p>Descripción: {selectedProperty.descripcion}</p>
          <p>Tipo de Propiedad: {selectedProperty.tipoPropiedad}</p>
          <p>Estado: {selectedProperty.estado}</p>
          <p>Orientación: {selectedProperty.orientacion}</p>
          <p>Ascensor: {selectedProperty.ascensor ? 'Sí' : 'No'}</p>
          <p>Parking: {selectedProperty.parking ? 'Sí' : 'No'}</p>
          <p>Piscina: {selectedProperty.piscina ? 'Sí' : 'No'}</p>
          <button onClick={closeModal}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
}

export default MiPropiedad;
