import React from 'react'
import { Link } from 'react-router-dom'


export function NotFound () {
    return (
      <div>
        <h1>404! The page you are looking for was not found.</h1>
        <p>
          <Link to="/">Go to home page</Link>
        </p>
      </div>
    );
}
