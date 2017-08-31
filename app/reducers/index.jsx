import axios from 'axios'

const initialState = {
	students: [],
	campuses: [],
	studentEntry: {
		name: '',
		email: '',
		campusId: 0
	},
	campusEntry: {
		name: '',
		image: ''
	}
}

const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS'
const GET_ALL_CAMPUSES = 'GET_ALL_CAMPUSES'
const GET_ONE_STUDENT = 'GET_ONE_STUDENT'
const GET_ONE_CAMPUS = 'GET_ONE_CAMPUS'
const STUDENT_ENTRY = 'STUDENT_ENTRY'
const CAMPUS_ENTRY = 'CAMPUS_ENTRY'
const EDIT_ONE_CAMPUS = 'EDIT_ONE_CAMPUS'
const EDIT_ONE_STUDENT = 'EDIT_ONE_STUDENT'

//Action Creators
export function getAllStudents(students){
	const action = {type: GET_ALL_STUDENTS, students: students}
	return action
}

export function getAllCampuses(campuses){
	const action = {type: GET_ALL_CAMPUSES, campuses}
	return action
}

export function getOneStudent(student){
	const action = {type: GET_ONE_STUDENT, student}
	return action
}

export function getOneCampus(campus){
	const action = {type: GET_ONE_CAMPUS, campus}
	return action
}

export function editOneCampus(campus){
	const action = {type: EDIT_ONE_CAMPUS, campus}
	return action
}

export function editOneStudent(student){
	const action = {type: EDIT_ONE_STUDENT, student}
	return action
}

export function enterStudent(studentEntry){
	const action = {type: STUDENT_ENTRY, studentEntry}
	console.log('ACTI', action.studentEntry)
	return action
}

export function enterCampus(campusEntry){
	const action = {type: CAMPUS_ENTRY, campusEntry}
	return action
}

//Thunk creators
export function fetchStudents(){
	return function thunk (dispatch){
		return axios.get('/api/students')
		   	.then(res => res.data)
		    .then(students => {
		    	dispatch(getAllStudents(students));
		    })
		    .catch(console.error)
  }
}

export function fetchCampuses(){
	return function thunk (dispatch){
		return axios.get('/api/campuses')
		   	.then(res => res.data)
		    .then(campuses => {
		    	dispatch(getAllCampuses(campuses));
		    })
		    .catch(console.error)
  }
}

export function postStudent(newStudent){
	return function thunk (dispatch){
		return axios.post('/api/students', newStudent)
	        .then(res => res.data)
	        .then(createdStudent => {
	        	// socket.emit('new-student', createdStudent);
	        	dispatch(getOneStudent(createdStudent));
	        })
	        .catch(console.error)
	}
}

export function postCampus(newCampus){
	return function thunk (dispatch){
		return axios.post('/api/campuses', newCampus)
	        .then(res => res.data)
	        .then(createdCampus => {
	          dispatch(getOneCampus(createdCampus));
	        })
	        .catch(console.error)
	}
}

export function editCampus(campus){
	return function thunk (dispatch){
		return axios.put(`/api/campuses/${campus.id}`, campus)
	        .then(res => res.data)
	        .then(editedCampus => {
	          dispatch(editOneCampus(editedCampus));
	        })
	        .catch(console.error)
	}
}

export function editStudent(student){
	return function thunk (dispatch){
		return axios.put(`/api/students/${student.id}`, student)
	        .then(res => res.data)
	        .then(editedStudent => {
	        	axios.get(`/api/campuses/${editedStudent.campusId}`)
	        		.then(res => res.data)
	        		.then(newCampus => {
	        			console.log(newCampus)
	        			editedStudent.campus = newCampus
	        		})
	        		.catch();
	        	// console.log('returned from axios', editedStudent)
	        	dispatch(editOneStudent(editedStudent));
	        })
	        .catch(console.error)
	}
}

export function deleteStudent(studentId){
	return function thunk (dispatch){
		return axios.delete(`/api/students/${studentId}`)
	        .then(res => res)
	        .catch(console.error)
	}
}

export function deleteCampus(campusId){
	return function thunk (dispatch){
		return axios.delete(`/api/campuses/${campusId}`)
			.catch(console.error)
	}
}

//reducer
const rootReducer = function(state = initialState, action) {
  switch(action.type) {
  	case GET_ALL_STUDENTS:
  		return Object.assign(
  			{}, 
  			state, 
  			{students: action.students}
  		)
	case GET_ALL_CAMPUSES:
  		return Object.assign(
  			{}, 
  			state, 
  			{campuses: action.campuses}
  		)
	case GET_ONE_STUDENT:
		const studentArr = state.students.concat([action.student])
  		return Object.assign(
  			{}, 
  			state, 
  			{students: studentArr}
  		)
	case GET_ONE_CAMPUS:
		const campusArr = state.campuses.concat([action.campus])
  		return Object.assign(
  			{}, 
  			state, 
  			{campuses: campusArr}
  		)
  	case EDIT_ONE_CAMPUS:
  		const editCampArr = state.campuses.filter(el => {
  			return el.id !== action.campus.id
  		})
  		editCampArr.push(action.campus)
  		return Object.assign(
  			{}, 
  			state, 
  			{campuses: editCampArr}
  		)
   	case EDIT_ONE_STUDENT:
  		const editStudArr = state.students.filter(el => {
  			return el.id !== action.student.id
  		})
  		editStudArr.push(action.student)
  		return Object.assign(
  			{}, 
  			state, 
  			{students: editStudArr}
  		)
 	case STUDENT_ENTRY:
 		// we test the action to see what keys it contains and update those keys
 		const newStudEntry = state.studentEntry
 		if (action.studentEntry.hasOwnProperty('name')) {
 			newStudEntry.name = action.studentEntry.name
 		}
 		if (action.studentEntry.hasOwnProperty('email')) {
 			newStudEntry.email = action.studentEntry.email
 		}
 		if (action.studentEntry.hasOwnProperty('campusId')) {
 			newStudEntry.campusId = +action.studentEntry.campusId
 		}
 		console.log('newStud', newStudEntry)
 		const returned = Object.assign(
  			{}, 
  			state, 
  			{studentEntry: newStudEntry}
  		)
  		console.log('returned', returned.studentEntry)
  		return returned
  	case CAMPUS_ENTRY:
  		// we test the action to see what keys it contains and update those keys
  		const newCampusEntry = state.campusEntry
 		if (action.campusEntry.hasOwnProperty('name')) {
 			newCampusEntry.name = action.campusEntry.name
 		}
 		if (action.campusEntry.hasOwnProperty('image')) {
 			newCampusEntry.image = action.campusEntry.image
 		}
  		return Object.assign(
  			{}, 
  			state, 
  			{campusEntry: newCampusEntry}
  		)
  	default: 
    	return state
  }
}

export default rootReducer
