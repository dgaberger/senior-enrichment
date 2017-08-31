import React from 'react';
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
    	<nav className="navbar navbar-default">
	      	<div className="container-fluid">
	      		<div className="navbar-header">
			      <Link className="navbar-brand" to="/">Interplanetary Campuses that are actually FSA People</Link>
			    </div>
			    <ul className="nav navbar-nav">
			        <li><Link to="/campuses">Campuses</Link></li>
			        <li><Link to="/students">Students</Link></li>
      			</ul>
      		</div>
      	</nav>
    )
}