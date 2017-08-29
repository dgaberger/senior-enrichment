import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import store, {fetchCampuses, deleteCampus} from '../store'

function AllCampuses(props) {
	const {campuses, handleDelete} = props
	return (
		<div>
			<h3>Campuses</h3>
			<div>
				<Link to="/campuses/create" className="btn btn-info">Add Campus</Link>
			</div>
			<div className="row col-xs-8">
				{
					campuses.map(campus => {
						return (
							<div key={campus.id} className="container col-xs-4">
								<Link to={`/campuses/${campus.id}`}>
									<h4>{campus.name}</h4>
									<img src={campus.image} className="img-responsive img-rounded" />
								</Link>
								<div className="btn-group">
									<Link to={`/campuses/${campus.id}/edit`} className="btn btn-warning" onClick={evt => console.log()}>Edit</Link>
									<button className="btn btn-danger" onClick={evt => handleDelete(campus.id)}>Remove</button>
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

const mapStateToProps = function (state, ownProps){
	return {
		campuses: state.campuses,
		students: state.students
	}
}

const mapDispatchToProps = function (dispatch, ownProps){
	return {
		handleDelete(id){
			dispatch(deleteCampus(id))
			dispatch(fetchCampuses())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCampuses)