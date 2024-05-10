import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>The resource you requested was not found</h1>
    <Link to="/c/inbox">Go to Home</Link>
  </div>
);

export default NotFound;
