import React from 'react'
import {connect} from 'react-redux'

import store, 	{
					enterStudent, 
					editStudent, 
					fetchStudents
				} from '../store'

function EditStudents(props) {
	const 	{
				handleInputs, 
				handleSubmit, 
				selected, 
				campuses, 
				studentEntry
			} = props
			
	const student = props.selected || {name: '', email: '', campusId: 0, campus: {name: ''}}
	return (
		<div className="col-xs-4 container">
			<h3>Editing: {student.name}</h3>
			<form onSubmit={evt => handleSubmit(evt, student.name, student.email, student.campusId, student.id)}>
				<div>
					<label htmlFor="name">New Name:</label>
					<input name="name" className="form-control" onChange={handleInputs} value={studentEntry.name}/>
				</div>
				<div>
					<label htmlFor="email">New Email:</label>
					<input name="email" className="form-control" onChange={handleInputs} value={studentEntry.email}/>
				</div>
				<div>
					<label htmlFor="campus">New Campus:</label>
					<select name="campusId" className="form-control" onChange={handleInputs}>
						<option/>
						{
							campuses.map(campus => {
								return (
									<option key={campus.id} value={campus.id}>{campus.name}</option>
								)
							})
						}
					</select>
				</div>
				<div className="form-group">
			        <button type="submit" className="btn btn-primary form-control">Submit Name/Email/Campus</button>
			    </div>
			</form>
		</div>
	)
}


const mapStateToProps = function (state, ownProps){
	const studentId = +ownProps.match.params.studentId
	return {
		selected: state.students.find(student => student.id === studentId),
		campuses: state.campuses,
		studentEntry: state.studentEntry
	}
}

const mapDispatchToProps = function (dispatch, ownProps){
	return {
		handleInputs(e){
			const target = e.target;
		    const value = target.value;
		    const name = target.name;
			dispatch(enterStudent({
				[name]: value 
			}))
			dispatch(fetchStudents())
		},
		handleSubmit(e, name, email, campusId, studentId){
			// e.preventDefault()
			const toBeEntered = store.getState().studentEntry
			toBeEntered.name = toBeEntered.name || name
			toBeEntered.email = toBeEntered.email || email
			toBeEntered.campusId = toBeEntered.campusId || campusId
			console.log('TBE: ', toBeEntered)
			toBeEntered.id = studentId
			dispatch(editStudent(toBeEntered))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStudents)
