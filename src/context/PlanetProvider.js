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
  const [loading, setLoading] = useState(true);

  const PLANET_CONTEXT = {
    loading,
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

  const sortAlphabetically = (a, b) => {
    const minusOne = -1;
    if (a > b) return 1;
    if (a < b) return minusOne;
    return 0;
  };

  const compareNumbers = (a, b, multiplier = 1) => {
    const minusOne = -1;
    if (a === 'unknown') return 1 * multiplier;
    if (b === 'unknown') return minusOne * multiplier;
    if (Number(a) > Number(b)) return 1;
    if (Number(a) < Number(b)) return minusOne;
    return 0;
  };

  useEffect(() => {
    const storePlanetData = async () => {
      const dataFromAPI = await getPlanetDataFromAPI();
      setData([...dataFromAPI]
        .sort((a, b) => sortAlphabetically(a.name, b.name)));
      setLoading(false);
    };
    storePlanetData();
  }, []);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
  useEffect(() => {
    const nameMatch = new RegExp(filterByName.name, 'i');
    const filteredData = data.filter(({ name }) => name.match(nameMatch));
    setFilteredPlanets(filteredData);
  }, [filterByName, data]);

  // useEffect watching numericFiltersArray to change filteredPlanets~
  useEffect(() => {
    const planetsFilteredByNumber = filterByNumericValues.reduce((acc, curr) => {
      switch (curr.comparison) {
      case 'greater than':
        return acc.filter((planet) => Number(planet[curr.column]) > Number(curr.value));
      case 'less than':
        return acc.filter((planet) => Number(planet[curr.column]) < Number(curr.value));
      case 'equal to':
        return acc.filter((planet) => Number(planet[curr.column]) === Number(curr.value));
      default:
        return acc;
      }
    }, data);
    setFilteredPlanets(planetsFilteredByNumber);
  }, [filterByNumericValues, data]);

  // useEffect watching sortingOrder object to sort filteredPlantes~
  useEffect(() => {
    const reverseOrderMultiplier = -1;
    switch (sortingOrder.sort) {
    case 'ASC':
      setFilteredPlanets((prevState) => [...prevState]
        .sort((a, b) => compareNumbers(
          a[sortingOrder.column], b[sortingOrder.column],
        )));
      break;
    case 'DSC':
      setFilteredPlanets((prevState) => [...prevState]
        .sort((a, b) => compareNumbers(
          b[sortingOrder.column], a[sortingOrder.column], reverseOrderMultiplier,
        )));
      break;
    default:
      return 0;
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
