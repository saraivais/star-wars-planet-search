import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import TableRow from './TableRow';

function Table() {
  const { filteredPlanets } = useContext(PlanetContext);
  // console.log(data);
  const isDataEmpty = filteredPlanets.length === 0;
  // console.log(isDataEmpty);
  // console.log(Object.keys(data[0]));

  return (
    <table>
      <thead>
        <tr>
          { !isDataEmpty && Object.keys(filteredPlanets[0])
            .filter((category) => category !== 'residents')
            .map((category) => (
              <th key={ category }>{ category }</th>
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
