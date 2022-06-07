import React, { useState, useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function Dashboard() {
  const INITIAL_NUMERIC_VALUES = {
    column: 'population',
    comparison: 'maior que',
    value: 100000,
  };
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState(INITIAL_NUMERIC_VALUES);
  const { nameFilter: { setFilterByName } } = useContext(PlanetContext);

  const handleNameInputChange = ({ target }) => {
    setNameFilter(target.value);
  };

  useEffect(() => {
    setFilterByName({ name: nameFilter });
  }, [nameFilter, setFilterByName]);

  return (
    <div>
      <label htmlFor="name">
        Planet Name:
        <input
          data-testid="name-filter"
          id="name"
          type="text"
          value={ nameFilter }
          onChange={ handleNameInputChange }
        />
      </label>
      <select name="column" data-testid="column-filter">
        { /* population, orbital_period, diameter, rotation_period, surface_water */}
      </select>
      <select name="comparison" data-testid="comparison-filter">
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input name="value" data-testid="value-filter" type="number" />
      <button
        type="button"
        data-testid="button-filter"
      >
        Filtrar

      </button>
    </div>
  );
}

export default Dashboard;
