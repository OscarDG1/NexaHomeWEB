import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';
import LoginRegistro from './screens/LoginRegistro';
import PropiedadForm from './screens/PropiedadForm';
import Propiedades from './screens/Propiedades';

function App() {
  console.log("La función App está siendo llamada");

  return (
     <Router>
       <Routes>
         <Route path="/" element={<HomeScreen />} />
         <Route path="/perfil" element={<PerfilScreen />} />
         <Route path="/loginRegistro" element={<LoginRegistro />} />
         <Route path="/propiedadForm" element={<PropiedadForm />} />
         <Route path="/propiedades" element={<Propiedades />} />
       </Routes>
     </Router>
   );
 }
export default App;
