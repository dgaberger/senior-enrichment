import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import store, {enterCampus, postCampus, fetchCampuses} from '../store'


function CreateCampus(props) {
	const {handleInputs, handleSubmit} = props
	return (
		<div className="col-xs-4 container">
			<h3>Campus Create:</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Campus Name:</label>
				<input name="name" onChange={handleInputs}/>
				<label htmlFor="img">Campus Image:</label>
				<input name="image" onChange={handleInputs}/>
				<div className="form-group">
			        <button type="submit" className="btn btn-default">Create Campus</button>
			    </div>
			</form>
		</div>
	)
}


const mapStateToProps = function (state, ownProps){

	return {
		// campuses: state.campuses
	}
}

const mapDispatchToProps = function (dispatch, ownProps){
	return {
		handleInputs(e){
			const target = e.target;
		    const value = target.value;
		    const name = target.name;
		    // console.log({[name]: value})
			dispatch(enterCampus({
				[name]: value 
			}))
		},
		handleSubmit(e){
			e.preventDefault()
			console.log('ENTRY IS', store.getState().campusEntry)

			dispatch(postCampus(store.getState().campusEntry))
			dispatch(fetchCampuses())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampus)
