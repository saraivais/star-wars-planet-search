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
    <div className="dashboard-container">
      <div className="dashboard-top">
        <label htmlFor="name">
          <input
            className="search-input"
            id="name"
            type="text"
            value={ nameFilter }
            onChange={ handleNameInputChange }
            placeholder="Search planets by name"
          />
        </label>
        <select
          className="search-input"
          name="column"
          value={ column }
          onChange={ handleAllThreeNumericFilterInputs }
        >
          { columnOptions.map((columnOption, index) => (
            <option key={ index } value={ columnOption }>{columnOption}</option>)) }
        </select>
        <select
          className="search-input"
          name="comparison"
          value={ comparison }
          onChange={ handleAllThreeNumericFilterInputs }
        >
          <option value="greater than">greater than</option>
          <option value="less than">less than</option>
          <option value="equal to">equal to</option>
        </select>
        <input
          className="search-input"
          name="value"
          type="number"
          value={ value }
          onChange={ handleAllThreeNumericFilterInputs }
        />
        <button
          type="button"
          onClick={ storeNumericFilter }
          className="filter-btn"
        >
          Filter

        </button>
      </div>
      <div className="dashboard-bottom">
        <label className="column-select-label" htmlFor="column-sort">
          Sort by
          <select
            className="column-select"
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
        <label className="radio-btn-label" htmlFor="sort-asc">
          ASC
          <input
            className="radio-btn-sort"
            id="sort-asc"
            value="ASC"
            name="sort"
            type="radio"
            onChange={ handleSortingOrderInputs }
          />
        </label>
        <label className="radio-btn-label" htmlFor="sort-dsc">
          DSC
          <input
            className="radio-btn-sort"
            id="sort-dsc"
            value="DSC"
            name="sort"
            type="radio"
            onChange={ handleSortingOrderInputs }
          />
        </label>
        <button
          className="sort-btn"
          type="button"
          onClick={ storeSortingFilter }
        >
          Sort

        </button>
      </div>
    </div>
  );
}

export default Dashboard;
