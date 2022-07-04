import React, { useContext } from 'react';
import PlanetContext from './context/PlanetContext';
import './App.css';
import Table from './components/Table';
import Dashboard from './components/Dashboard';
import CurrentFilters from './components/CurrentFilters';
import Loading from './components/Loading';

function App() {
  const { loading } = useContext(PlanetContext);
  return (
    <>
      { loading
        ? <Loading />
        : (
          <>
            <Dashboard />
            <CurrentFilters />
            <Table />
          </>
        )}
      {/* <Loading />
      <Dashboard />
      <CurrentFilters />
      <Table /> */}
    </>
  );
}

export default App;
