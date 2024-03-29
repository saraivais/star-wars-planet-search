import React from 'react';
import './TableRow.css';

function TableRow(planetObject) {
  const { planetObject: {
    climate,
    created,
    diameter,
    edited,
    films,
    gravity,
    name,
    orbital_period: orbitalPeriod,
    population,
    rotation_period: rotationPeriod,
    surface_water: surfaceWater,
    terrain,
    url,
  } } = planetObject;

  return (
    <tr className="table-row">
      <td>{ name }</td>
      <td>{ rotationPeriod }</td>
      <td>{ orbitalPeriod }</td>
      <td>{ diameter }</td>
      <td>{ climate }</td>
      <td>{ gravity }</td>
      <td>{ terrain }</td>
      <td>{ surfaceWater }</td>
      <td>{ population }</td>
      <td>
        { films.length && films
          .map((linkAdress, index) => (
            <a
              key={ index }
              href={ linkAdress }
              target="_blank"
              rel="noreferrer"
              className="link-address"
            >
              { linkAdress }
            </a>)) }
      </td>
      <td>{ created }</td>
      <td>{ edited }</td>
      <td>
        <a className="link-address" href={ url } target="blank">{ url }</a>
      </td>
    </tr>
  );
}

export default TableRow;
