import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import store, { fetchStudents, fetchCampuses } from '../store'


export default function Seed(props) {
    const campusSeed = [
        { name: 'Tom', image: 'https://cloud.fullstackacademy.com/Tom-1.jpg?mtime=20160511110611' },
        { name: 'Ceren', image: 'https://cloud.fullstackacademy.com/2016-01-25-Ceren-1.jpg?mtime=20160125181838' },
        { name: 'Gabriel', image: 'https://cloud.fullstackacademy.com/gabriel_lebec.jpg?mtime=20151116210816' },
        { name: 'Dan', image: 'https://cloud.fullstackacademy.com/Daniel-S.jpg?mtime=20160511111242' },
        { name: 'Cassio', image: 'https://cloud.fullstackacademy.com/Cassio-Zen.jpg?mtime=20170608174603' }
    ]

    const studentSeed = [
        { name: 'Marky Mark', email: 'funcyBUNCH@gmail.com', campusIdx: 1 },
        { name: 'MC Hammer', email: 'time@gmail.com', campusIdx: 1 },
        { name: 'Chaka Kahn', email: 'rockit@gmail.com', campusIdx: 2 },
        { name: 'Paula Abdul', email: 'straightup@gmail.com', campusIdx: 1 },
        { name: 'Steve Perry', email: 'highwayrun@gmail.com', campusIdx: 2 },
        { name: 'Duran Duran', email: 'hungry@gmail.com', campusIdx: 3 },
        { name: 'Kansas', email: 'carryon@gmail.com', campusIdx: 4 },
        { name: 'Lionel Ritchie', email: 'hello@gmail.com', campusIdx: 4 },
        { name: 'Soft Cell', email: 'taintedluv@gmail.com', campusIdx: 5 },
        { name: 'Warren Zevon', email: 'britishlycans@gmail.com', campusIdx: 5 }
    ]

    var campuscounter = 1
    campusSeed.forEach(campus => {
        axios.post('/api/campuses', campus)
            .then(res => res.data)
            .then(createdCampus => {
                studentSeed.forEach(student => {
                    if (student.campusIdx === campuscounter) {
                        student.campusId = createdCampus.id
                        axios.post('/api/students', student)
                            .catch(console.error)
                    }
                })
            })
            .then(res => {
                campuscounter += 1
            })
    })
    return (
		<div>
			<h3 />
			<a href="../" className="btn btn-primary">Seeding done, click here for the homepage</a>
		</div>
	)
}
