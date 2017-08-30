import React, { Component } from 'react';
import Navbar from './Navbar'
import {HashRouter, Route} from 'react-router-dom'
import {Switch} from 'react-router'
import AllStudents from './AllStudents'
import AllCampuses from './AllCampuses'
import SelectedCampus from './SelectedCampus'
import SelectedStudent from './SelectedStudent'
import CreateCampus from './CreateCampus'
import CreateStudent from './CreateStudent'
import EditCampus from './EditCampus'
import EditStudent from './EditStudent'

import store, {fetchStudents, fetchCampuses} from '../store'

export default class Root extends Component {
  
  componentDidMount () {
    const studentsThunk = fetchStudents();
    const campusThunk = fetchCampuses();
    store.dispatch(studentsThunk);
    store.dispatch(campusThunk);
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Navbar />
          <div className="container-fluid">
              <Route exact path="/" component={AllCampuses}/>
              <Route path="/campuses" component={AllCampuses}/>
              <Route path="/students" component={AllStudents}/>
              <Switch>
                <Route exact path="/campuses/create" component={CreateCampus}/>
                <Route exact path="/students/create" component={CreateStudent}/>
                <Route exact path="/campuses/:campusId/edit" component={EditCampus}/>
                <Route exact path="/students/:studentId/edit" component={EditStudent}/>
                <Route exact path="/campuses/:campusId" component={SelectedCampus}/>
                <Route exact path="/students/:studentId" component={SelectedStudent}/>
            </Switch>
          </div>
        </div>
      </HashRouter>
    )
  }
}