import React, { useState } from 'react';
import '../styles/Propiedades.css';
import NavigationBar from './NavigationBar';
import casa from '../assets/casa.jpg';
import bano from '../assets/bano.jpg';
import superficie from '../assets/superficie.png';
import habitacion from '../assets/habitacion.png';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Needed for accessibility

function PropertyList() {
  const [properties] = useState([
    {
      name: "Casa 1",
      price: 250000,
      squareMeters: 200,
      habitacion: 3,
      banos: 2,
      ciudad: "Ciudad 1",
      provincia: "Provincia 1",
      calle: "Calle 1",
      numero: 1,
      planta: 1,
      descripcion: "Descripción de la casa 1",
      tipoPropiedad: "Casa",
      estado: "Casi nuevo",
      orientacion: "Norte",
      ascensor: false,
      parking: true,
      piscina: true,
      owner: { name: "Propietario 1", email: "propietario1@example.com" },
      imagePath: [casa]
    },
    {
      name: "Casa 2",
      price: 300000,
      squareMeters: 180,
      habitacion: 4,
      banos: 3,
      ciudad: "Ciudad 2",
      provincia: "Provincia 2",
      calle: "Calle 2",
      numero: 2,
      planta: 2,
      descripcion: "Descripción de la casa 2",
      tipoPropiedad: "Piso",
      estado: "Muy bien",
      orientacion: "Sur",
      ascensor: true,
      parking: false,
      piscina: false,
      owner: { name: "Propietario 2", email: "propietario2@example.com" },
      imagePath: [casa]
    },
    {
      name: "Casa 3",
      price: 200000,
      squareMeters: 220,
      habitacion: 5,
      banos: 3,
      ciudad: "Ciudad 3",
      provincia: "Provincia 3",
      calle: "Calle 3",
      numero: 3,
      planta: 3,
      descripcion: "Descripción de la casa 3",
      tipoPropiedad: "Casa",
      estado: "A reformar",
      orientacion: "Oeste",
      ascensor: false,
      parking: true,
      piscina: true,
      owner: { name: "Propietario 3", email: "propietario3@example.com" },
      imagePath: [casa]
    }
  ]);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (property) => {
    setSelectedProperty(property);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setModalIsOpen(false);
  };

  const PropertyCard = ({ property }) => {
    const handleContactClick = () => {
      alert(`Contactar al propietario:\nNombre: ${property.owner.name}\nEmail: ${property.owner.email}`);
    };

    return (
      <div className="property-card">
        <div className="property-image-container" onClick={() => openModal(property)}>
          <img src={property.imagePath[0]} alt="Imagen de la casa" className="property-image" />
        </div>
        <div className="property-details">
          <div className="property-texts">
            <span className="property-price">
              <span className="price-bold">{property.price}€</span>
            </span>
            <span className="property-meters">
              <img src={superficie} alt="Icono de superficie" className="property-icon" />
              <span className="price-bold">Superficie:</span>&nbsp;{property.squareMeters} m²
            </span>
            <span className="property-bedrooms">
              <img src={habitacion} alt="Icono de habitaciones" className="property-icon" />
              <span className="price-bold">Habitaciones:</span>&nbsp;{property.habitacion}
            </span>
            <span className="property-bathrooms">
              <img src={bano} alt="Icono de baños" className="property-icon" />
              <span className="price-bold">Baños:</span>&nbsp;{property.banos}
            </span>
          </div>
          <button className="contact-button btn" onClick={handleContactClick}>Contactar</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <NavigationBar />
      <div className="property-list">
        {properties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>
      {selectedProperty && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Property Details"
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

export default PropertyList;
