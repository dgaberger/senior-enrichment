import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteStudent, fetchStudents, enterStudent } from '../store'

function AllStudents(props) {
    const { students, handleDelete, handleEditPress } = props
    return (
		<div>
			<h3>All Students:</h3>
			<div className="col-xs-8">
				<div style={{marginBottom: '15px'}}>
					<Link 
						to="/students/create" 
						className="btn btn-info">
						Add Student
					</Link>
				</div>
				<table className="table">
					<tbody>
						<tr>
							<th className="col-xs-1">ID</th>
							<th className="col-xs-2">Name</th>
							<th className="col-xs-2">Email</th>
							<th className="col-xs-1">Campus</th>
							<th className="col-xs-1"></th>
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
										<td className="col-xs-1">{student.campus ? student.campus.name : ''}</td>
										<td className="col-xs-1">
											<Link 
												to={`/students/${student.id}`} 
												className="btn btn-primary btn-xs">
												View
											</Link>
										</td>
										<td className="col-xs-1">
											<Link 
												to={`/students/${student.id}/edit`} 
												className="btn btn-warning btn-xs" 
												onClick={evt => handleEditPress(student.name, student.email, student.campusId)}>
												Edit
											</Link>
										</td>
										<td className="col-xs-1">
											<button 
												className="btn btn-danger btn-xs" 
												onClick={evt => handleDelete(student.id)}>
												X
											</button>
										</td>
									</tr>	
								)
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

const mapStateToProps = function(state, ownProps) {
    return {
        students: state.students
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        handleEditPress(name, email, campusId) {
            dispatch(enterStudent({ name, email, campusId }))
        },
        handleDelete(id) {
            dispatch(deleteStudent(id))
            dispatch(fetchStudents())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStudents)