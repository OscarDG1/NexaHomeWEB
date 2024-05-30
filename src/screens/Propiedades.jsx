import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Propiedades.css';
import NavigationBar from './NavigationBar';
import Modal from 'react-modal';
import casa from '../assets/casa.jpg';
import bano from '../assets/bano.jpg';
import superficie from '../assets/superficie.png';
import habitacion from '../assets/habitacion.png';
import Fondo from '../assets/fondopantalla.jpg';

const API_BASE_URL = 'http://192.168.0.23:7770';

function Propiedades() {
  const navigate = useNavigate();
  const [propiedades, setPropiedades] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [contactModalIsOpen, setContactModalIsOpen] = useState(false);
  const [contactProperty, setContactProperty] = useState(null);
  const count = 0;

  useEffect(() => {
    const fetchPropiedades = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Obteniendo información de todas las propiedades...');
        const response = await fetch(`${API_BASE_URL}/property/allProperty?position=${count}`, {
          method: 'GET',
          headers: {
            'Authorization': token,
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener las propiedades');
        }

        const data = await response.json();
        if (data && data.length > 0) {
          const propiedadesData = await Promise.all(
            data.map(async (prop) => {
              const imageUrl = await fetchImage(prop[0]);
              return {
                id: prop[0],
                email: prop[1],
                metrosCuadrados: prop[2],
                ciudad: prop[3],
                provincia: prop[4],
                calle: prop[5],
                numero: prop[6],
                precio: prop[7],
                estado: prop[8],
                parking: prop[9],
                piscina: prop[10],
                tipoPropiedad: prop[11],
                planta: prop[12],
                descripcion: prop[13],
                habitacion: prop[16],
                bano: prop[17],
                orientacion: prop[14],
                ascensor: prop[15],
                imagePath: imageUrl
              };
            })
          );
          setPropiedades(propiedadesData);
        }
      } catch (error) {
        console.error('Error al obtener las propiedades:', error);
        alert(`Error al obtener las propiedades: ${error.message}`);
        navigate('/'); // Redirige en caso de error
      }
    };

    fetchPropiedades();
  }, [navigate]);

  const fetchImage = async (propertyId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/property/iconImg?idProperty=${propertyId}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener la imagen de la propiedad');
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  const openModal = (property) => {
    setSelectedProperty(property);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setModalIsOpen(false);
  };

  const openContactModal = (property) => {
    setContactProperty(property);
    setContactModalIsOpen(true);
  };

  const closeContactModal = () => {
    setContactProperty(null);
    setContactModalIsOpen(false);
  };

  return (
    <div>
      <NavigationBar />
      <div className="property-list">
        {propiedades.length === 0 ? (
          <div className="msg">
            <p className="msg">Cargando propiedades...</p>
          </div>
        ) : (
          <div>
            {propiedades.map((propiedad, index) => (
              <div key={index} className="property-card" onClick={() => openModal(propiedad)}>
                <div className="property-image-container">
                  {propiedad.imagePath ? (
                    <img src={propiedad.imagePath} alt="Imagen de la casa" className="property-image" />
                  ) : (
                    <div className="no-image">No hay imagen disponible</div>
                  )}
                </div>
                <div className="property-details">
                  <div className="property-texts">
                    <span className="property-price">
                      <span className="price-bold">{propiedad.precio ? `${propiedad.precio}€` : 'Precio no disponible'}</span>
                    </span>
                    <span className="property-meters">
                      <span className="price-bold">Superficie:</span>&nbsp;{propiedad.metrosCuadrados ? `${propiedad.metrosCuadrados} m²` : 'Superficie no disponible'}
                    </span>
                    <span className="property-bedrooms">
                      <span className="price-bold">Habitaciones:</span>&nbsp;{propiedad.habitacion || 'No disponible'}
                      {propiedad.habitacion && <img src={habitacion} alt="Icono de habitaciones" className="property-icon" />}
                    </span>
                    <span className="property-bathrooms">
                      <span className="price-bold">Baños:</span>&nbsp;{propiedad.bano || 'No disponible'}
                      {propiedad.bano && <img src={bano} alt="Icono de baños" className="property-icon" />}
                    </span>
                  </div>
                  <button className="contact-button btn" onClick={(e) => { e.stopPropagation(); openContactModal(propiedad); }}>Contactar</button>
                </div>
              </div>
            ))}
          </div>
        )}
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
      {contactProperty && (
        <Modal
          isOpen={contactModalIsOpen}
          onRequestClose={closeContactModal}
          contentLabel="Contactar Propiedad"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Contactar Propiedad</h2>
          <p>ID: {contactProperty.id}</p>
          <p>Email: {contactProperty.email}</p>
          <button onClick={closeContactModal}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
}

export default Propiedades;