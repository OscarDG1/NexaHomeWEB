import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeScreen.css';
import nexahomeLogo from '../assets/nexahome.png';
import lupaIcon from '../assets/lupa.png';
import NavigationBar from './NavigationBar';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

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

  const handleOptionPress = (option) => {
    if (option === 'Cerrar sesión') {
      handleLogout();
    } else if (option === 'Perfil') {
      navigate('/perfil');
    } else if (option === 'comprar' || option === 'alquilar') {
      setSelectedOption(option);
    } else {
      // Manejar otras opciones si es necesario
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('username');
      setLoggedIn(false);
      setUsername('');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  const handleSearch = () => {
    // Manejar la funcionalidad de búsqueda
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
                <button className="headerLink" onClick={() => handleOptionPress('Perfil')}>Perfil</button>
                <button className="headerLink" onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        </div>
        <div className="searchBar">
          <img
            src={lupaIcon}
            alt="Buscar"
            className="searchIcon"
          />
          <input
            type="text"
            placeholder="Buscar pisos..."
            className="searchInput"
          />
          <button
            className="searchButton"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
        <div className="options">
          <button
            className={`optionButton ${selectedOption === 'comprar' && 'selectedOption'}`}
            onClick={() => handleOptionPress('comprar')}
          >
            Comprar
          </button>
          <button
            className={`optionButton ${selectedOption === 'alquilar' && 'selectedOption'}`}
            onClick={() => handleOptionPress('alquilar')}
          >
            Alquilar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
