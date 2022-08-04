import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import TableRow from './TableRow';
import './Table.css';

function Table() {
  const { filteredPlanets } = useContext(PlanetContext);
  const isDataEmpty = filteredPlanets.length === 0;
  return (
    <table className="planet-table">
      <thead>
        <tr>
          { !isDataEmpty && Object.keys(filteredPlanets[0])
            .filter((category) => category !== 'residents')
            .map((category) => (
              <th className="table-headers" key={ category }>{ category }</th>
            ))}
        </tr>
      </thead>
      <tbody>
        { !isDataEmpty && filteredPlanets
          .map((category, index) => <TableRow key={ index } planetObject={ category } />)}

      </tbody>
    </table>
  );
}

export default Table;
