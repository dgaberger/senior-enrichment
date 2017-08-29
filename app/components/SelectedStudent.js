import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

function SelectedStudent(props) {
	console.log('HIT', props)
	const student = props.selected || {name: '', email: '', campus: {name: ''}}
	return (
		<div className="col-xs-4 container">
			<div>
				<h3>Student Info:</h3>
				<h4>Name: {student.name}</h4>
				<h4>Email: {student.email}</h4>
				<Link to={`../campuses/${student.campus.id}`}>
				<h3>{student.campus.name}</h3>
				</Link>
			</div>
		</div>
	)
}


const mapStateToProps = function (state, ownProps){
	const studentId = +ownProps.match.params.studentId
	console.log('state', state, studentId)
	return {
		selected: state.students.find(student => student.id === studentId),
		studentId
	}
}

export default connect(mapStateToProps)(SelectedStudent)
