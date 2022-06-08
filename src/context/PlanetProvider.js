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
  const [sortingOrder, setSortingOrder] = useState({});

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
    sortingOrderFilter: {
      sortingOrder,
      setSortingOrder,
    },
    allSelectOptions,
  };

  const compareNumbersAscending = (a, b) => {
    const minusOne = -1;
    if (a === 'unknown') return 1;
    if (b === 'unknown') return minusOne;
    if (Number(a) > Number(b)) return 1;
    if (Number(a) < Number(b)) return minusOne;
    return 0;
  };

  const sortAlphabetically = (a, b) => {
    const minusOne = -1;
    if (a > b) return 1;
    if (a < b) return minusOne;
    return 0;
  };

  const compareNumbersDescending = (a, b) => {
    const minusOne = -1;
    if (a === 'unknown') return 1;
    if (b === 'unknown') return minusOne;
    if (Number(a) < Number(b)) return 1;
    if (Number(a) > Number(b)) return minusOne;
    return 0;
  };

  useEffect(() => {
    const storePlanetData = async () => {
      const dataFromAPI = await getPlanetDataFromAPI();
      setData([...dataFromAPI]
        .sort((a, b) => sortAlphabetically(a.name, b.name)));
    };
    storePlanetData();
  }, []);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

  useEffect(() => {
    const nameMatch = new RegExp(filterByName.name, 'i');
    const filteredData = data.filter(({ name }) => name.match(nameMatch));
    setFilteredPlanets(filteredData);
  }, [filterByName, data]);

  // useEffect watching numeric Filters to change filteredPlanets~
  useEffect(() => {
    const planetsFilteredByNumber = filterByNumericValues.reduce((acc, curr) => {
      switch (curr.comparison) {
      case 'maior que':
        return acc.filter((planet) => Number(planet[curr.column]) > Number(curr.value));
      case 'menor que':
        return acc.filter((planet) => Number(planet[curr.column]) < Number(curr.value));
      case 'igual a':
        return acc.filter((planet) => Number(planet[curr.column]) === Number(curr.value));
      default:
        return acc;
      }
    }, data);
    setFilteredPlanets(planetsFilteredByNumber);
  }, [filterByNumericValues, data]);

  useEffect(() => {
    switch (sortingOrder.sort) {
    case 'ASC':
      setFilteredPlanets((prevState) => [...prevState]
        .sort((a, b) => compareNumbersAscending(
          a[sortingOrder.column], b[sortingOrder.column],
        )));
      break;
    case 'DSC':
      setFilteredPlanets((prevState) => [...prevState]
        .sort((a, b) => compareNumbersDescending(
          a[sortingOrder.column], b[sortingOrder.column],
        )));
      break;
    default:
      break;
    }
  }, [sortingOrder]);

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
