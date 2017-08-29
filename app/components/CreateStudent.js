import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {postStudent, fetchStudents} from '../store'

function CreateStudent(props) {
	const {campuses} = props
	return (
		<div className="col-xs-4 container">
			<h3>Student Create:</h3>
			<form>
				<label htmlFor="name">Student Name:</label>
				<input />
				<label htmlFor="img">Student Email:</label>
				<input />
				<label htmlFor="img">Student Campus:</label>
				<select>
					<option></option>
					{
						campuses.map(campus => {
							return (
								<option key={campus.id}>{campus.name}</option>
							)
						})
					}
				</select>
				<div className="form-group">
			        <button type="submit" className="btn btn-default">Create Student</button>
			    </div>
			</form>
		</div>
	)
}


const mapStateToProps = function (state, ownProps){

	return {
		campuses: state.campuses
	}
}

const mapDispatchToProps = function (dispatch, ownProps){
	return {
		handleDelete(id){
			dispatch()
			dispatch(fetchStudents())
		}
	}
}

export default connect(mapStateToProps)(CreateStudent)
