import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de react-router-dom para la navegación
import '../styles/Propiedades.css'; // Importa los estilos CSS específicos para esta página
import NavigationBar from './NavigationBar'; // Importa el componente NavigationBar
import Modal from 'react-modal'; // Importa el componente Modal de react-modal
import casa from '../assets/casa.jpg'; // Importa una imagen de casa
import bano from '../assets/bano.jpg'; // Importa una imagen de baño
import superficie from '../assets/superficie.png'; // Importa una imagen de superficie
import habitacion from '../assets/habitacion.png'; // Importa una imagen de habitación
// import { propiedadesPrueba } from './datosPrueba'; // Importación comentada de datos de prueba

// Define una clase Propiedad que contiene las propiedades de una propiedad inmobiliaria
class Propiedad {
  constructor({
    metrosCuadrados,
    ciudad,
    provincia,
    calle,
    numero,
    precio,
    estado,
    parking,
    piscina,
    tipoPropiedad,
    planta,
    descripcion,
    habitacion,
    bano,
    orientacion,
    ascensor
  }) {
    // Inicializa las propiedades del objeto
    this.metrosCuadrados = metrosCuadrados;
    this.ciudad = ciudad;
    this.provincia = provincia;
    this.calle = calle;
    this.numero = numero;
    this.precio = precio;
    this.estado = estado;
    this.parking = parking;
    this.piscina = piscina;
    this.tipoPropiedad = tipoPropiedad;
    this.planta = planta;
    this.descripcion = descripcion;
    this.habitacion = habitacion;
    this.bano = bano;
    this.orientacion = orientacion;
    this.ascensor = ascensor;
  }

  // Método para obtener una descripción breve de la propiedad
  obtenerDescripcionBreve() {
    return `${this.tipoPropiedad} en ${this.calle}, ${this.ciudad}. ${this.metrosCuadrados} m², ${this.habitacion} habitaciones, ${this.bano} baños.`;
  }
}

function MiPropiedad() {
  const navigate = useNavigate(); // Hook para la navegación
  const [propiedades, setPropiedades] = useState([]); // Estado para almacenar las propiedades
  const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar si el modal está abierto
  const [selectedProperty, setSelectedProperty] = useState(null); // Estado para almacenar la propiedad seleccionada
  const API_BASE_URL = 'http://192.168.0.23:7770'; // URL base de la API

  // Hook useEffect para obtener las propiedades cuando el componente se monta
  useEffect(() => {
    const fetchMisPropiedades = async () => {
      const token = localStorage.getItem('token'); // Obtiene el token del localStorage
      if (!token) {
        alert('No estás logueado. Por favor, inicia sesión.');
        navigate('/'); // Redirige al usuario si no está logueado
        return;
      }

      try {
        console.log('Obteniendo información de las propiedades...');
        const response = await fetch(`${API_BASE_URL}/property/myProperty`, {
          method: 'GET',
          headers: {
            'Authorization': token,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las propiedades');
        }

        const data = await response.json();
        const propiedadesData = [];


        data.forEach((prop, index) => {
          propiedadesData.push(
            new Propiedad({
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
              habitacion: prop[14],
              bano: prop[15],
              orientacion: prop[16],
              ascensor: prop[17]
            })
          );
        });
        console.log("Cantidad Propiedades");
        console.log("--------------------");
        console.log(propiedadesData.length);
        console.log("");
        console.log("Informacion por propiedad");
        console.log("-------------------------");
        propiedadesData.forEach(property => {
          console.log(property.obtenerDescripcionBreve());
        })

        //const propiedadesData = data.map((item) => new Propiedad(item)); // Mapea los datos a instancias de la clase Propiedad
        //console.log('Información de las propiedades obtenida:', propiedadesData);
        setPropiedades(propiedadesData); // Actualiza el estado con las propiedades obtenidas
      } catch (error) {
        console.error('Error al obtener las propiedades:', error);
        alert(`Error al obtener las propiedades: ${error.message}`);
        navigate('/'); // Redirige en caso de error
      }
    };

    fetchMisPropiedades();
  }, [navigate]); // El efecto se ejecuta solo una vez al montarse el componente

  // Función para abrir el modal y establecer la propiedad seleccionada
  const openModal = (property) => {
    setSelectedProperty(property);
    setModalIsOpen(true);
  };

  // Función para cerrar el modal y limpiar la propiedad seleccionada
  const closeModal = () => {
    setSelectedProperty(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <NavigationBar /> {/* Componente de la barra de navegación */}
      <div className="property-list">
        {propiedades.length === 0 ? ( // Condicional para mostrar un mensaje mientras se cargan las propiedades
          <div className="msg">
            <p className="msg">Cargando propiedades...</p>
          </div>
        ) : (
          <div>
            {(() => {
              const elementos = [];
              propiedades.forEach((propiedad, index) => {
                elementos.push(
                  <div key={index} className="property-card" onClick={() => openModal(propiedad)}>
                    <div className="property-image-container">
                      {propiedad.imagePath && propiedad.imagePath.length > 0 ? (
                        <img src={propiedad.imagePath[0]} alt="Imagen de la casa" className="property-image" />
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
                      <button className="contact-button btn" onClick={() => alert('Contacto no implementado')}>Contactar</button>
                    </div>
                  </div>
                );
              });
              return elementos;
            })()}
          </div>
        )}
      </div>
      {selectedProperty && ( // Condicional para mostrar el modal si hay una propiedad seleccionada
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

export default MiPropiedad; // Exporta el componente MiPropiedad como el valor predeterminado
