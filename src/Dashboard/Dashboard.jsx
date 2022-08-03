import React, { useState, useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';
import './Dashboard.css';

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
    <div>
      <label htmlFor="name">
        Planet Name:
        <input
          id="name"
          type="text"
          value={ nameFilter }
          onChange={ handleNameInputChange }
        />
      </label>
      <select
        name="column"
        value={ column }
        onChange={ handleAllThreeNumericFilterInputs }
      >
        { columnOptions.map((columnOption, index) => (
          <option key={ index } value={ columnOption }>{columnOption}</option>)) }
      </select>
      <select
        name="comparison"
        value={ comparison }
        onChange={ handleAllThreeNumericFilterInputs }
      >
        <option value="greater than">greater than</option>
        <option value="less than">less than</option>
        <option value="equal to">equal to</option>
      </select>
      <input
        name="value"
        type="number"
        value={ value }
        onChange={ handleAllThreeNumericFilterInputs }
      />
      <button
        type="button"
        onClick={ storeNumericFilter }
      >
        Filter

      </button>
      <hr />
      <label htmlFor="column-sort">
        Column:
        <select
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
          id="sort-dsc"
          value="DSC"
          name="sort"
          type="radio"
          onChange={ handleSortingOrderInputs }
        />
      </label>
      <button
        type="button"
        onClick={ storeSortingFilter }
      >
        Sort

      </button>
    </div>
  );
}

export default Dashboard;
