// import { combineReducers } from 'redux'
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

export function studentEntry(studentEntry){
	const action = {type: STUDENT_ENTRY, studentEntry}
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
		    });
  }
}

export function fetchCampuses(){
	return function thunk (dispatch){
		return axios.get('/api/campuses')
		   	.then(res => res.data)
		    .then(campuses => {
		    	dispatch(getAllCampuses(campuses));
		    });
  }
}

export function postStudent(newStudent){
	return function thunk (dispatch){
		return axios.post('/api/students', newStudent)
	        .then(res => res.data)
	        .then(createdStudent => {
	        	// socket.emit('new-student', createdStudent);
	        	dispatch(getOneStudent(createdStudent));
	        });
	}
}

export function postCampus(newCampus){
	return function thunk (dispatch){
		return axios.post('/api/campuses', newCampus)
	        .then(res => res.data)
	        .then(createdCampus => {
	          dispatch(getOneCampus(createdCampus));
	        })
	}
}

export function editCampus(campus){
	return function thunk (dispatch){
		return axios.put(`/api/campuses/${campus.id}`, campus)
	        .then(res => res.data)
	        .then(editedCampus => {
	          dispatch(getOneCampus(editedCampus));
	        })
	}
}

export function deleteStudent(studentId){
	return function thunk (dispatch){
		return axios.delete(`/api/students/${studentId}`)
	        .then(res => res)
	        .then(deleted => {
	        	console.log('BALEETED', deleted)
	        });
	}
}

export function deleteCampus(campusId){
	return function thunk (dispatch){
		return axios.delete(`/api/campuses/${campusId}`)
	        .then(res => res)
	        .then(deleted => {
	        	console.log('BALEETED', deleted)
	        });
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
 	case STUDENT_ENTRY:
 		// console.log('ACTION', state)
  		return Object.assign(
  			{}, 
  			state, 
  			{studentEntry: {
  				name: action.studentEntry.name || state.studentEntry.name,
  				email: action.studentEntry.email || state.studentEntry.email,
  				campusId: action.studentEntry.campusId || state.studentEntry.campusId
  			}}
  		)
  	case CAMPUS_ENTRY:
 		console.log('ACTION', state.campusEntry)
  		return Object.assign(
  			{}, 
  			state, 
  			{campusEntry: {
  				name: action.campusEntry.name || state.campusEntry.name,
  				image: action.campusEntry.image || state.campusEntry.image
  			}}
  		)
  	default: 
    	return state
  }
}

export default rootReducer
