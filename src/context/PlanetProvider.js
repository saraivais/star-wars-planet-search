import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanetDataFromAPI from '../services/StarWarsAPI';

function PlanetProvider({ children }) {
  const allSelectOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const PLANET_CONTEXT = {
    nameFilter: {
      filterByName,
      setFilterByName,
    },
    numericFilter: {
      filterByNumericValues,
      setFilterByNumericValues,
    },
    filteredPlanets,
    planetData: {
      data,
      setData,
    },
    allSelectOptions,
  };

  const storePlanetData = async () => {
    const dataFromAPI = await getPlanetDataFromAPI();
    setData(dataFromAPI);
  };

  useEffect(() => {
    storePlanetData();
  }, []);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

  useEffect(() => {
    const nameMatch = new RegExp(filterByName.name, 'i');
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
