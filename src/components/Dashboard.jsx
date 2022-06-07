import React, { useState, useContext } from 'react';

function Dashboard() {
  const [nameFilter, setNameFilter] = useState('');

  const handleInputChange = ({ target }) => {
    setNameFilter(target.value);
  }

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
