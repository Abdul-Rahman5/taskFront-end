import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return <>
  
  <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center mt-5">
          <h1 className="display-4">404</h1>
          <p className="lead">Oops! Page not found.</p>
          <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
          <Link className="btn btn-primary mt-3" to="/">Go Back to Home</Link>
        </div>
      </div>
    </div>
  </>
}
