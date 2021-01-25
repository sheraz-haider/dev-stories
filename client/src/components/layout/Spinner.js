import React, { Fragment } from 'react';
import spinner from '../../assets/images/spinner.gif';

function Spinner() {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </Fragment>
  );
}

export default Spinner;