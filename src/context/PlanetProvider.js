import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanetDataFromAPI from '../services/StarWarsAPI';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const PLANET_CONTEXT = {
    nameFilter: {
      filterByName,
      setFilterByName,
    },
    filteredPlanets,
    planetData: {
      data,
      setData,
    },
  };

  const storePlanetData = async () => {
    const dataFromAPI = await getPlanetDataFromAPI();
    setData(dataFromAPI);
  };

  useEffect(() => {
    storePlanetData();
  }, []);

  useEffect(() => {
    const nameMatch = new RegExp(filterByName.name);
    const filteredData = data.filter(({ name }) => name.match(nameMatch));
    setFilteredPlanets(filteredData);
  }, [filterByName, data]);

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
