import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import store, {enterCampus, editCampus, fetchCampuses} from '../store'

function EditCampus(props) {
	const {handleInputs, handleSubmit, selected, students, campusEntry} = props
	const campus = props.selected || {name: '', image: ''}
	const entryName = campusEntry.name || campus.name
	return (
		<div className="col-xs-4 container">
			<h3>Editing: {campus.name}</h3>
			<form onSubmit={evt => handleSubmit(evt, campus.name, campus.image, campus.id)}>
				<label htmlFor="name">Campus Name:</label>
				<input name="name" value={entryName} onChange={handleInputs}/>
				<label htmlFor="img">Campus Image:</label>
				<input name="image" value={campus.image} onChange={handleInputs}/>
				<div className="form-group">
			        <button type="submit" className="btn btn-default">Submit Name/Email</button>
			    </div>
			</form>
		</div>
	)
}


const mapStateToProps = function (state, ownProps){
	const campusId = +ownProps.match.params.campusId
	// console.log('state', state, campusId)
	return {
		selected: state.campuses.find(campus => campus.id === campusId),
		students: state.students.filter(student => student.campusId === campusId),
		campusEntry: state.campusEntry
	}
}

const mapDispatchToProps = function (dispatch, ownProps){
	return {
		handleInputs(e){
			const target = e.target;
		    const value = target.value;
		    const name = target.name;
		    console.log({[name]: value})
			dispatch(enterCampus({
				[name]: value 
			}))
		},
		handleSubmit(e, name, image, campusId){
			e.preventDefault()
			// console.log('ENTRY IS', store.getState().campusEntry)
			const toBeEntered = store.getState().campusEntry
			toBeEntered.name = toBeEntered.name || name
			toBeEntered.image = toBeEntered.image || image
			toBeEntered.id = campusId
			console.log('ISNOW', toBeEntered)
			dispatch(editCampus(toBeEntered))
			dispatch(fetchCampuses())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCampus)
