import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeScreen.css';
import nexahomeLogo from '../assets/nexahome.png';
import lupaIcon from '../assets/lupa.png';
import NavigationBar from './NavigationBar';
import Modal from 'react-modal';
import habitacion from '../assets/habitacion.png';
import bano from '../assets/bano.jpg';
import Propiedad from './Propiedad'; // Asegúrate de importar la clase Propiedad

const HomeScreen = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contactModalIsOpen, setContactModalIsOpen] = useState(false);
  const [contactProperty, setContactProperty] = useState(null);

  const API_BASE_URL = 'http://192.168.0.23:7770';

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
          setLoggedIn(true);
        }
      } catch (error) {
        console.log('Error al verificar el estado de inicio de sesión:', error);
      }
    };

    checkLoggedInStatus();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('username');
      setLoggedIn(false);
      setUsername('');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

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
    const imageUrl = URL.createObjectURL(blob);
    console.log(`Imagen para propiedad ${propertyId}: ${imageUrl}`);
    return imageUrl;
  };

  const handleSearch = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás logueado. Por favor, inicia sesión.');
      navigate('/'); // Redirige al usuario si no está logueado
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/property/getByCity?city=${searchQuery}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error al buscar propiedades');
      }
      const data = await response.json();
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
      setProperties(propiedadesData);
    } catch (error) {
      console.error('Error al buscar propiedades:', error);
      alert(`Error al buscar propiedades: ${error.message}`);
    }
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
      <div className="container">
        <div className="header">
          <h1 className="title">Bienvenidos a NexaHome</h1>
          <img
            src={nexahomeLogo}
            alt="Nexahome Logo"
            className="iconLogo"
          />
          <div className="headerLinksContainer">
            {loggedIn && (
              <div className="dropdownContainer">
                <span className="headerLink">Bienvenido, {username}</span>
                <button className="headerLink" onClick={() => navigate('/perfil')}>Perfil</button>
                <button className="headerLink" onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        </div>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Buscar pisos por ciudad..."
            className="searchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img
            src={lupaIcon}
            alt="Buscar"
            className="searchIcon"
          />
          <button
            className="searchButton"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="property-list">
        {properties.length === 0 ? (
          <div className="msg">
            <p className="msg">No se encontraron propiedades</p>
          </div>
        ) : (
          <div>
            {properties.map((property, index) => (
              <div key={index} className="property-card" onClick={() => openModal(property)}>
                <div className="property-image-container">
                  {property.imagePath ? (
                    <img src={property.imagePath} alt="Imagen de la casa" className="property-image" />
                  ) : (
                    <div className="no-image">No hay imagen disponible</div>
                  )}
                </div>
                <div className="property-details">
                  <div className="property-texts">
                    <span className="property-price">
                      <span className="price-bold">{property.precio ? `${property.precio}€` : 'Precio no disponible'}</span>
                    </span>
                    <span className="property-meters">
                      <span className="price-bold">Superficie:</span>&nbsp;{property.metrosCuadrados ? `${property.metrosCuadrados} m²` : 'Superficie no disponible'}
                    </span>
                    <span className="property-bedrooms">
                      <span className="price-bold">Habitaciones:</span>&nbsp;{property.habitacion || 'No disponible'}
                      {property.habitacion && <img src={habitacion} alt="Icono de habitaciones" className="property-icon" />}
                    </span>
                    <span className="property-bathrooms">
                      <span className="price-bold">Baños:</span>&nbsp;{property.bano || 'No disponible'}
                      {property.bano && <img src={bano} alt="Icono de baños" className="property-icon" />}
                    </span>
                  </div>
                  <button className="contact-button btn" onClick={(e) => { e.stopPropagation(); openContactModal(property); }}>Contactar</button>
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
};

export default HomeScreen;
