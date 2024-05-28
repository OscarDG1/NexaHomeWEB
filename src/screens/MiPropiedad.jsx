import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Modal from 'react-modal';
import '../styles/Propiedades.css';

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
          <img src={miPropiedad.imagePath[0]} alt="Imagen de la casa" className="property-image" />
        </div>
        <div className="property-details">
          <div className="property-texts">
            <span className="property-price">
              <span className="price-bold">{miPropiedad.price}€</span>
            </span>
            <span className="property-meters">
              <span className="price-bold">Superficie:</span>&nbsp;{miPropiedad.squareMeters} m²
            </span>
            <span className="property-bedrooms">
              <span className="price-bold">Habitaciones:</span>&nbsp;{miPropiedad.habitacion}
            </span>
            <span className="property-bathrooms">
              <span className="price-bold">Baños:</span>&nbsp;{miPropiedad.banos}
            </span>
          </div>
          <button className="contact-button btn" onClick={handleContactClick}>Contactar</button>
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
          <h2>{selectedProperty.name}</h2>
          <p>Precio: {selectedProperty.price}€</p>
          <p>Superficie: {selectedProperty.squareMeters} m²</p>
          <p>Habitaciones: {selectedProperty.habitacion}</p>
          <p>Baños: {selectedProperty.banos}</p>
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
