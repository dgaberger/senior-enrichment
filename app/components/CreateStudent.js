import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import store, {postStudent, fetchStudents, studentEntry} from '../store'

function CreateStudent(props) {
	const {campuses, handleSubmit, handleInputs} = props
	return (
		<div className="col-xs-4 container">
			<h3>Student Create:</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Student Name:</label>
				<input name="name" onChange={handleInputs}/>
				<label htmlFor="email">Student Email:</label>
				<input name="email" onChange={handleInputs}/>
				<label htmlFor="campus">Student Campus:</label>
				<select name="campusId" onChange={handleInputs}>
					<option></option>
					{
						campuses.map(campus => {
							return (
								<option key={campus.id} value={campus.id}>{campus.name}</option>
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
		handleInputs(e){
			const target = e.target;
		    const value = target.value;
		    const name = target.name;
		    // console.log({[name]: value})
			dispatch(studentEntry({
				[name]: value 
			}))
		},
		handleSubmit(e){
			e.preventDefault()
			// console.log('ENTRY IS', store.getState().studentEntry)

			dispatch(postStudent(store.getState().studentEntry))
			dispatch(fetchStudents())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent)
