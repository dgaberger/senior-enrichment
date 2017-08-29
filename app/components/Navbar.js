import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default function Navbar(){
    return (
      <nav className="btn-group">
        <Link to="/" className="btn btn-primary">Home  </Link>
        <Link to="/campuses" className="btn btn-warning">Campuses</Link>
        <Link to="/students" className="btn btn-success">Students</Link>
      </nav>
    )
}