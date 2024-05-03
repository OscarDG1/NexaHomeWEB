import React from 'react';
import { useState } from 'react';
import '../styles/Propiedades.css';
import NavigationBar from './NavigationBar';
import { useNavigate } from 'react-router-dom';


import casa from '../assets/casa.jpg';

function PropertyList() {
   const navigate = useNavigate()
  const [properties] = useState([
    { name: "Casa 1", price: 250000, squareMeters: 200 },
    { name: "Casa 2", price: 300000, squareMeters: 180 },
    { name: "Casa 3", price: 200000, squareMeters: 220 }
  ]);

  const PropertyCard = ({ property }) => (
    <div className="property-card">
      <div className="property-image-container">
        <img src={casa} alt="Imagen de la casa" className="property-image" />
        <div className="property-details">
          <div className="property-price">Precio: <span className="price-bold">${property.price}</span></div>
          <div className="property-meters"><span className="price-bold">Superficie: {property.squareMeters} m2</span></div>
          <button className="contact-button btn">Contactar</button>
        </div>
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
