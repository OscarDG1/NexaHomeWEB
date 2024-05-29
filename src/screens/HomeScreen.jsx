import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import '../styles/HomeScreen.css';
import nexahomeLogo from '../assets/nexahome.png';
import lupaIcon from '../assets/lupa.png';
import NavigationBar from './NavigationBar';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);


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

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('API_BASE_URL/cities');
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error al obtener las ciudades:', error);
      }
    };

    fetchCities();
  }, []);

  const handleOptionPress = (option) => {
    if (option === 'Cerrar sesión') {
      handleLogout();
    } else if (option === 'Perfil') {
      navigate('/perfil');
    } else if (option === 'comprar' || option === 'alquilar') {
      setSelectedOption(option);
    } else {

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
    navigate(`/search?city=${searchQuery}`);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : cities.filter(city =>
      city.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion}
    </div>
  );

  const onChange = (event, { newValue }) => {
    setSearchQuery(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSearchQuery(suggestion);
    handleSearch();
  };

  const inputProps = {
    placeholder: 'Buscar pisos por ciudad...',
    value: searchQuery,
    onChange: onChange
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
