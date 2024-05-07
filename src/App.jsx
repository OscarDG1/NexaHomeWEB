import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';
import LoginRegistro from './screens/LoginRegistro';
import PropiedadForm from './screens/PropiedadForm';
import Propiedades from './screens/Propiedades';
import SocialMediaPage from './screens/SocialMediaPage';

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
       </Routes>
     </Router>
   );
 }
export default App;
