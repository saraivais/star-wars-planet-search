import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanetDataFromAPI from '../services/StarWarsAPI';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);

  const PLANET_CONTEXT = {
    planetData: {
      data,
      setData,
    },
    myFilters: {
      filters,
      setFilters,
    },
  };

  const storePlanetData = async () => {
    const dataFromAPI = await getPlanetDataFromAPI();
    setData(dataFromAPI);
  };

  useEffect(() => {
    storePlanetData();
  }, []);

  return (
    <PlanetContext.Provider value={ PLANET_CONTEXT }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default PlanetProvider;
