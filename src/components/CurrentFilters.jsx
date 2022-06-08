import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

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
    // console.log('newFilters', newFilters);
    // console.log('filterByNumericValues', filterByNumericValues);
    setFilterByNumericValues(newFilters);
  };

  return (
    <section>
      <h2>Filtros existentes:</h2>
      <hr />
      { filterByNumericValues.length && filterByNumericValues
        .map(({ column, comparison, value }, index) => (
          <div key={ index } data-testid="filter">
            {`${column} ${comparison} ${value}`}
            <button
              type="button"
              id={ column }
              onClick={ removeSelectedFilter }
            >
              X

            </button>
          </div>))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover todas filtragens

      </button>
    </section>
  );
}

export default CurrentFilters;
