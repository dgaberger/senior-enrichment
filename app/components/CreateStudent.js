import React from 'react'
import {connect} from 'react-redux'
import store, {postStudent, fetchStudents, enterStudent} from '../store'

function CreateStudent(props) {
	const {campuses, handleSubmit, handleInputs} = props
	return (
		<div className="col-xs-4 container">
			<h3>Student Create:</h3>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Student Name:</label>
					<input name="name" className="form-control" onChange={handleInputs}/>
				</div>
				<div>
					<label htmlFor="email">Student Email:</label>
					<input name="email" className="form-control" onChange={handleInputs}/>
				</div>
				<div>
					<label htmlFor="campus">Student Campus:</label>
					<select name="campusId" className="form-control" onChange={handleInputs}>
						<option></option>
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
			        <button type="submit" className="btn btn-success form-control">Create Student</button>
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
			dispatch(enterStudent({
				[name]: value 
			}))
		},
		handleSubmit(e){
			e.preventDefault()
			dispatch(postStudent(store.getState().studentEntry))
			dispatch(fetchStudents())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent)
