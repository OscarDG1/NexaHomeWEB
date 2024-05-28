import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';
import LoginRegistro from './screens/LoginRegistro';
import PropiedadForm from './screens/PropiedadForm';
import Propiedades from './screens/Propiedades';
import SocialMediaPage from './screens/SocialMediaPage';
import ChangePassword from './screens/change-password';
import EditProfile from './screens/edit-profile';
import MiPropiedad from './screens/MiPropiedad'; // Cambiado aquí

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegistro />} />
        <Route path="/perfil" element={<PerfilScreen />} />
        <Route path="/buscar" element={<HomeScreen />} />
        <Route path="/propiedadForm" element={<PropiedadForm />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/socialMedia" element={<SocialMediaPage />} />
        <Route path="/change-password" element={<ChangePassword/>} />
        <Route path="/edit-profile" element={<EditProfile/>} />
        <Route path="/MiPropiedad" element={<MiPropiedad />} />
      </Routes>
    </Router>
  );
}

export default App;
