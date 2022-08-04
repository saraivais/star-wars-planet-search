import React, { useContext } from 'react';
import PlanetContext from './context/PlanetContext';
import Table from './Table/Table';
import Dashboard from './Dashboard/Dashboard';
import FilterList from './FilterList/FilterList';
import Loading from './Loading/Loading';
import Header from './Header/Header';

function App() {
  const { loading } = useContext(PlanetContext);
  return (
    <>
      <Header />
      { loading
        ? <Loading />
        : (
          <>
            <Dashboard />
            <FilterList />
            <Table />
          </>
        )}
    </>
  );
}

export default App;
