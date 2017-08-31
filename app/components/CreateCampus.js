import React from 'react'
import {connect} from 'react-redux'
import store, {enterCampus, postCampus, fetchCampuses} from '../store'


function CreateCampus(props) {
	const {handleInputs, handleSubmit} = props
	return (
		<div className="col-xs-4 container">
			<h3>Campus Create:</h3>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Campus Name:</label>
					<input name="name" onChange={handleInputs}/>
				</div>
				<div>
					<label htmlFor="img">Campus Image:</label>
					<input name="image" onChange={handleInputs}/>
				</div>
				<div className="form-group">
			        <button type="submit" className="btn btn-default">Create Campus</button>
			    </div>
			</form>
		</div>
	)
}


const mapStateToProps = function (state, ownProps){
	return {
	}
}

const mapDispatchToProps = function (dispatch, ownProps){
	return {
		handleInputs(e){
			const target = e.target;
		    const value = target.value;
		    const name = target.name;
			dispatch(enterCampus({
				[name]: value 
			}))
		},
		handleSubmit(e){
			e.preventDefault()
			dispatch(postCampus(store.getState().campusEntry))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampus)
