import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => {
  return <div>
  Page not found
  <br/>
  <Link to='/home'>Back to Homepage</Link>
  </div>
};

export default NotFoundPage;