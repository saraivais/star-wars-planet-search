import React, { useState, useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function Dashboard() {
  const INITIAL_NUMERIC_VALUES = {
    column: 'population',
    comparison: 'maior que',
    value: 0,
  };

  const {
    nameFilter: { setFilterByName },
    numericFilter: { filterByNumericValues, setFilterByNumericValues },
    allSelectOptions,
  } = useContext(PlanetContext);

  const [nameFilter, setNameFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState(INITIAL_NUMERIC_VALUES);
  const [columnOptions, setColumnOptions] = useState(allSelectOptions);

  const { column, comparison, value } = numericFilter;

  const handleNameInputChange = ({ target }) => {
    setNameFilter(target.value);
  };

  const handleAllThreeNumericFilterInputs = ({ target }) => {
    const { name, value: inputValue } = target;
    setNumericFilter((prevState) => ({ ...prevState, [name]: inputValue }));
  };

  const storeNumericFilter = () => {
    setFilterByNumericValues((prevState) => ([...prevState, numericFilter]));
  };

  useEffect(() => {
    setFilterByName({ name: nameFilter });
  }, [nameFilter, setFilterByName]);

  useEffect(() => {
    setColumnOptions(allSelectOptions
      .filter((selectOption) => filterByNumericValues
        .every((filter) => selectOption !== filter.column)));
  }, [filterByNumericValues, allSelectOptions]);

  console.log(columnOptions);
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
      <select
        name="column"
        data-testid="column-filter"
        value={ column }
        onChange={ handleAllThreeNumericFilterInputs }
      >
        { columnOptions.map((columnOption, index) => (
          <option key={ index } value={ columnOption }>{columnOption}</option>)) }
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ handleAllThreeNumericFilterInputs }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="value"
        data-testid="value-filter"
        type="number"
        value={ value }
        onChange={ handleAllThreeNumericFilterInputs }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ storeNumericFilter }
      >
        Filtrar

      </button>
    </div>
  );
}

export default Dashboard;
