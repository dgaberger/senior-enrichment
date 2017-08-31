import React from 'react'
import {connect} from 'react-redux'
import store, 	{
					enterCampus, 
					editCampus, 
					fetchCampuses, 
					deleteStudent, 
					fetchStudents, 
					editStudent
				} from '../store'

function EditCampus(props) {
	const {
		handleInputs, 
		handleSubmit, 
		handleDelete, 
		selected, 
		studentsAtCamp, 
		studentsNotAtCamp,
		handleAddStud,
		campusEntry
		} = props

	const campus = props.selected || {name: '', image: ''}
	const studentsAt = props.studentsAtCamp || []
	const studentsNot = props.studentsNotAtCamp || []

	return (
		<div className="col-xs-4 container">
			<h3>Editing: {campus.name}</h3>
			<form onSubmit={evt => handleSubmit(evt, campus.name, campus.image, campus.id)}>
				<div>
					<label htmlFor="name">New Name:</label>
					<input type="text" className="form-control" name="name" onChange={handleInputs} value={campusEntry.name}/>
				</div>
				<div>
					<label htmlFor="img">New Image:</label>
					<input type="text" className="form-control" name="image" onChange={handleInputs} value={campusEntry.image}/>
				</div>
				<div className="form-group">
			        <button type="submit" className="btn btn-primary form-control">Submit Name/Image</button>
			    </div>
			    <ul>
			    <label>Remove from Campus (deletes Student)</label>
			    {
			    	studentsAt.map(student => {
			    		return (
				    		<li key={student.id} style={{margin: '10px'}}>{student.name}
				    			<button style={{float: 'right'}}
					    			className="btn btn-danger btn-xs" 
					    			onClick={evt => handleDelete(student.id)}>
				    			X</button>
				    		</li>
			    		)
			    	})
			    }
			    <label>Transfer to Campus</label>
			    {
			    	studentsNot.map(student => {
			    		return (
				    		<li key={student.id} style={{margin: '10px'}}>{student.name} (from {student.campus.name})
				    			<button style={{float: 'right'}}
				    			className="btn btn-primary btn-xs" 
				    			onClick={evt => handleAddStud(student.name, student.email, student.id)}>
				    			+</button>
				    		</li>
			    		)
			    	})
			    }
			    </ul>
			</form>
		</div>
	)
}


const mapStateToProps = function (state, ownProps){
	const campusId = +ownProps.match.params.campusId
	const selected = state.campuses.find(campus => campus.id === campusId) || {name: '', image: ''}
	return {
		selected: selected,
		studentsAtCamp: state.students.filter(student => student.campusId === campusId),
		studentsNotAtCamp: state.students.filter(student => student.campusId !== campusId),
		campusEntry: state.campusEntry
	}
}

const mapDispatchToProps = function (dispatch, ownProps){
	return {
		handleDelete(id){
			dispatch(deleteStudent(id))
			dispatch(fetchStudents())
		},
		handleAddStud(name, email, id){
			const campusId = +ownProps.match.params.campusId
			const toBeEntered = {
				name, 
				email,
				campusId,
				id 
			}
			dispatch(editStudent(toBeEntered))
		},
		handleInputs(e){
			const target = e.target;
		    const value = target.value;
		    const name = target.name;
		    console.log(name)
			dispatch(enterCampus({
				[name]: value 
			}))
		},
		handleSubmit(e, name, image, campusId){
			e.preventDefault()
			const toBeEntered = store.getState().campusEntry
			toBeEntered.name = toBeEntered.name || name
			toBeEntered.image = toBeEntered.image || image
			toBeEntered.id = campusId
			dispatch(editCampus(toBeEntered))
			dispatch(fetchStudents())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCampus)
