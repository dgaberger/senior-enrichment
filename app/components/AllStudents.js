import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import store, {deleteStudent, fetchStudents} from '../store'

function AllStudents(props) {
	const {handleDelete, students} = props
	return (
		<div>
			<h3>All Students:</h3>
			<div>
				<Link to="/students/create" className="btn btn-info">Add Student</Link>
			</div>
			<table className="col-xs-8">
				<tbody>
					<tr>
						<th className="col-xs-2">ID</th>
						<th className="col-xs-2">Name</th>
						<th className="col-xs-2">Email</th>
						<th className="col-xs-1">Campus</th>
						<th className="col-xs-1"></th>
						<th className="col-xs-1"></th>
					</tr>
					{
						students.map(student => {
							return (
								<tr key={student.id}>
									<td className="col-xs-1">{student.id}</td>
									<td className="col-xs-2">{student.name}</td>
									<td className="col-xs-2">{student.email}</td>
									<td className="col-xs-1">{student.campus.name}</td>
									<td className="col-xs-1">
										<Link to={`/students/${student.id}`} className="btn btn-primary btn-xs">View</Link>
									</td>
									<td className="col-xs-1">
										<button className="btn btn-warning btn-xs">Edit</button>
									</td>
									<td className="col-xs-1">
										<button className="btn btn-danger btn-xs" onClick={evt => handleDelete(student.id)}>X</button>
									</td>
								</tr>	
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}


const mapStateToProps = function (state, ownProps){
	return {
		students: state.students
	}
}

const mapDispatchToProps = function (dispatch, ownProps){
	return {
		handleDelete(id){
			dispatch(deleteStudent(id))
			dispatch(fetchStudents())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStudents)
