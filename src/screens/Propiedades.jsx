import React, { useState } from 'react';
import '../styles/Propiedades.css';
import NavigationBar from './NavigationBar';
import { useNavigate } from 'react-router-dom';
import casa from '../assets/casa.jpg';
import bano from '../assets/bano.jpg';
import superficie from '../assets/superficie.png';
import habitacion from '../assets/habitacion.png';

function PropertyList() {
  const navigate = useNavigate();
  const [properties] = useState([
    { name: "Casa 1", price: 250000, squareMeters: 200, habitacion: 3, banos: 2 },
    { name: "Casa 2", price: 300000, squareMeters: 180, habitacion: 4, banos: 3 },
    { name: "Casa 3", price: 200000, squareMeters: 220, habitacion: 5, banos: 3 }
  ]);

const PropertyCard = ({ property }) => (
  <div className="property-card">
    <div className="property-image-container">
      <img src={casa} alt="Imagen de la casa" className="property-image" />
    </div>
    <div className="property-details">
      <div className="property-texts">
        <span className="property-price">
          <span className="price-bold">{property.price}€</span>
        </span>
        <span className="property-meters">
          <img src={superficie} alt="Icono de superficie" className="property-icon" />
          <span className="price-bold">Superficie:</span>&nbsp;{property.squareMeters} m2
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
      <button className="contact-button btn">Contactar</button>
    </div>
  </div>
);
  return (
    <div>
      <NavigationBar />
      <div className="property-list">
        {properties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
