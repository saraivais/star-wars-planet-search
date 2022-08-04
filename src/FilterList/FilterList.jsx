import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import './FilterList.css';

function CurrentFilters() {
  const {
    numericFilter: {
      filterByNumericValues,
      setFilterByNumericValues,
    },
  } = useContext(PlanetContext);

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
  };

  const removeSelectedFilter = ({ target }) => {
    const { id } = target;
    const newFilters = filterByNumericValues.filter((filter) => filter.column !== id);
    setFilterByNumericValues(newFilters);
  };

  return (
    <section className="filter-section">
      <h2 className="filters-title">Current Filters:</h2>
      <div className="filters-container">
        { filterByNumericValues.length !== 0 && filterByNumericValues
          .map(({ column, comparison, value }, index) => (
            <div className="applied-filter" key={ index } data-testid="filter">
              <p className="filter-name">{`${column} ${comparison} ${value}`}</p>
              <button
                className="remove-one-filter"
                type="button"
                id={ column }
                onClick={ removeSelectedFilter }
              >
                X

              </button>
            </div>))}
      </div>
      <button
        className="clear-filters-btn"
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remove all filters

      </button>
    </section>
  );
}

export default CurrentFilters;
