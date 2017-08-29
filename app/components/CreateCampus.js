import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

function CreateCampus(props) {
	return (
		<div className="col-xs-4 container">
			<h3>Campus Create:</h3>
			<form>
				<label htmlFor="name">Campus Name:</label>
				<input />
				<label htmlFor="img">Campus Image:</label>
				<input />
				<div className="form-group">
			        <button type="submit" className="btn btn-default">Create Campus</button>
			    </div>
			</form>
		</div>
	)
}


const mapStateToProps = function (state, ownProps){

	return {
	}
}

export default connect(mapStateToProps)(CreateCampus)
