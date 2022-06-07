import React from 'react';

function Dashboard() {
  return (
    <div>
      <label htmlFor="name">
        Planet Name:
        <input data-testid="name-filter" id="name" type="text" />
      </label>
    </div>
  );
}

export default Dashboard;
