import React, { useState, useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function Dashboard() {
  const INITIAL_NUMERIC_VALUES = {
    column: 'population',
    comparison: 'greater than',
    value: 0,
  };

  const INITIAL_SORTING_VALUES = {
    column: 'population',
    sort: 'ASC',
  };

  const {
    nameFilter: { setFilterByName },
    numericFilter: { filterByNumericValues, setFilterByNumericValues },
    allSelectOptions,
    sortingOrderFilter: { setSortingOrder },
  } = useContext(PlanetContext);

  const [nameFilter, setNameFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState(INITIAL_NUMERIC_VALUES);
  const [columnOptions, setColumnOptions] = useState(allSelectOptions);
  const [sortingFilter, setSortingFilter] = useState(INITIAL_SORTING_VALUES);

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

  const handleSortingOrderInputs = ({ target }) => {
    const { name, value: sortInputValue } = target;
    setSortingFilter((prevState) => ({ ...prevState, [name]: sortInputValue }));
  };

  const storeSortingFilter = () => {
    setSortingOrder(sortingFilter);
  };

  useEffect(() => {
    setFilterByName({ name: nameFilter });
  }, [nameFilter, setFilterByName]);

  useEffect(() => {
    setColumnOptions(allSelectOptions
      .filter((selectOption) => filterByNumericValues
        .every((filter) => selectOption !== filter.column)));
  }, [filterByNumericValues, allSelectOptions]);

  return (
    <div className="bg-dark-blue">
      <label htmlFor="name" className="font-mono text-lg">
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
        <option value="greater than">greater than</option>
        <option value="less than">less than</option>
        <option value="equal to">equal to</option>
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
        Filter

      </button>
      <hr />
      <label htmlFor="column-sort">
        Column:
        <select
          data-testid="column-sort"
          name="column"
          id="column-sort"
          value={ sortingFilter.column }
          onChange={ handleSortingOrderInputs }
        >
          {allSelectOptions.map((columnOptionForSort) => (
            <option key={ columnOptionForSort } value={ columnOptionForSort }>
              { columnOptionForSort }
            </option>))}
        </select>
      </label>
      <label htmlFor="sort-asc">
        ASC
        <input
          data-testid="column-sort-input-asc"
          id="sort-asc"
          value="ASC"
          name="sort"
          type="radio"
          onChange={ handleSortingOrderInputs }
        />
      </label>
      <label htmlFor="sort-dsc">
        DSC
        <input
          data-testid="column-sort-input-desc"
          id="sort-dsc"
          value="DSC"
          name="sort"
          type="radio"
          onChange={ handleSortingOrderInputs }
        />
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ storeSortingFilter }
      >
        Sort

      </button>
    </div>
  );
}

export default Dashboard;
