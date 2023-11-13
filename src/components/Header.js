import React from 'react';
import moment from 'moment';

function Header(props) {
  return (
    <div>
      <h1>Connections</h1>
      <p>{moment().format('MMMM D YYYY')}</p>
    </div>
  );
}

export default Header;
