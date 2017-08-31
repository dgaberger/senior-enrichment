import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'


function Seed(props) {
	const {handleClick} = props
	return (
		<div className="col-xs-4 container">
			<h3>Click to Seed</h3>
			<button onClick={handleClick}>pls click only once, or fix it yourself in postico</button>
		</div>
	)
}

const mapDispatchToProps = function (dispatch, ownProps){
	return {
		handleClick(e){
			const campusIdArr =[]
			campusSeed.forEach(campus => {
				axios.post('/api/campuses', campus)
			        .then(res => res.data)
			        .then(createdCampus => {
			          campusIdArr.push(createdCampus.id)
			        })
	        		.catch(console.error)
			})

			studentSeed.forEach(student => {
				student.campusId = campusIdArr[student.campusId - 1]
				axios.post('/api/students', student)
			        .catch(console.error)
			})
		}
	}
}

export default connect(null, mapDispatchToProps)(Seed)

const campusSeed = [
	{name: 'Tom', image: 'https://cloud.fullstackacademy.com/Tom-1.jpg?mtime=20160511110611'},
	{name: 'Omri', image: 'https://cloud.fullstackacademy.com/omri_bernstein.jpg?mtime=20151116210855'},
	{name: 'Gabriel', image: 'https://cloud.fullstackacademy.com/gabriel_lebec.jpg?mtime=20151116210816'},
	{name: 'Dan', image: 'https://cloud.fullstackacademy.com/Daniel-S.jpg?mtime=20160511111242'},
	{name: 'Cassio', image: 'https://cloud.fullstackacademy.com/Cassio-Zen.jpg?mtime=20170608174603'}
]

const studentSeed = [
	{name: 'Marky Mark', email: 'funcyBUNCH@gmail.com', campusId: 1},
	{name: 'MC Hammer', email: 'time@gmail.com', campusId: 1},
	{name: 'Chaka Kahn', email: 'rockit@gmail.com', campusId: 2},
	{name: 'Paula Abdul', email: 'straightup@gmail.com', campusId: 1},
	{name: 'Steve Perry', email: 'highwayrun@gmail.com', campusId: 2},
	{name: 'Duran Duran', email: 'hungry@gmail.com', campusId: 3},
	{name: 'Kansas', email: 'carryon@gmail.com', campusId: 4},
	{name: 'Lionel Ritchie', email: 'hello@gmail.com', campusId: 4},
	{name: 'Soft Cell', email: 'taintedluv@gmail.com', campusId: 5},
	{name: 'Warren Zevon', email: 'britishlycans@gmail.com', campusId: 5}
]