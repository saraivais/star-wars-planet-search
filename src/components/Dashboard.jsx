import React, { useState, useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function Dashboard() {
  const [nameFilter, setNameFilter] = useState('');
  const { nameFilter: { setFilterByName } } = useContext(PlanetContext);

  const handleInputChange = ({ target }) => {
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
          onChange={ handleInputChange }
        />
      </label>
    </div>
  );
}

export default Dashboard;
