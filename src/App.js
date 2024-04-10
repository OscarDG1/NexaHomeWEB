import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';
import LoginRegistro from './screens/LoginRegistro';

function App() {
  console.log("La función App está siendo llamada");

  return (
    <Router>
      <Routes>
        {/* Esta ruta renderizará HomeScreen al iniciar el proyecto */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/perfil" element={<PerfilScreen />} />
        <Route path="/loginRegistro" element={<LoginRegistro />} />
      </Routes>
    </Router>
  );
}

export default App;
