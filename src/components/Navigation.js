import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Navigation() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/profile'>My Profile</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
