import React from 'react';
// import PlanetContext from './context/MyContext';
import './App.css';
import PlanetProvider from './context/PlanetProvider';
import Table from './components/Table';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <PlanetProvider>
      <span>Hello, Emperor!</span>
      <Dashboard />
      <Table />
    </PlanetProvider>
  );
}

export default App;
