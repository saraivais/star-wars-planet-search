import React, { useContext } from 'react';
import PlanetContext from './context/PlanetContext';
import Table from './Table/Table';
import Dashboard from './Dashboard/Dashboard';
import FilterList from './FilterList/FilterList';
import Loading from './Loading/Loading';

function App() {
  const { loading } = useContext(PlanetContext);
  return (
    <>
      { loading
        ? <Loading />
        : (
          <>
            <Dashboard />
            <FilterList />
            <Table />
          </>
        )}
      {/* <Loading />
      <Dashboard />
      <FilterList />
      <Table /> */}
    </>
  );
}

export default App;
