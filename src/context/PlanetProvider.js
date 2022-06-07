import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanetDataFromAPI from '../services/StarWarsAPI';

function PlanetProvider({ children }) {
  // const INITIAL_FILTERS = [{ filterByName: { name: '' } }];

  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  // const [filters, setFilters] = useState([]);
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
    // myFilters: {
    //   filters,
    //   setFilters,
    // },
  };

  const storePlanetData = async () => {
    const dataFromAPI = await getPlanetDataFromAPI();
    setData(dataFromAPI);
  };

  useEffect(() => {
    storePlanetData();
  }, []);

  useEffect(() => {
    setFilteredPlanets(data);
  }, [data]);

  // console.log('filteredPlanets', filteredPlanets);

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
