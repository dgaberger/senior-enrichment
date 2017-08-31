import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function SelectedCampus(props) {
    const campus = props.selected || { name: '', image: '' }
    const students = props.students
    return (
		<div className="col-xs-4 container">
			<div>
				<h3>Campus Info:</h3>
				<h4>{campus.name}</h4>
				<img src={campus.image} className="img-responsive img-rounded" />
			</div>
			<ul className="list-group">
				<label>Students Attending</label>
				{
					students.map(student => {
						return (
							<li key={student.id} className="list-group-item">
								<Link to={`../students/${student.id}`}>{student.name}</Link>
							</li>
						)
					})
				}
			</ul>
		</div>
	)
}

const mapStateToProps = function(state, ownProps) {
    const campusId = +ownProps.match.params.campusId
    return {
        selected: state.campuses.find(campus => campus.id === campusId),
        students: state.students.filter(student => student.campusId === campusId),
    }
}

export default connect(mapStateToProps)(SelectedCampus)