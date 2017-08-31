### Views and Functionality
#### See Wireframes folder for visual
<!-- 
- Navigation: as a user I...
  * will land on **Home** by default
  * can navigate to **Campuses** from **Home**
  * can navigate to **Students** from **Home** -->
  <!-- * can navigate to view a **Single Campus** from **Campuses** -->
  <!-- * can navigate to view a **Single Student** from **Students** -->
<!--   * can navigate to view a **Single Student** from **Single Campus** (for any student at that campus) -->
<!--   * can navigate to view that student's **Single Campus** from **Single Student** -->

<!-- - Views: as a user I...
  * see a list of all campuses on the **Campuses** view -->
  <!-- * see a list of all students on the **Students** view -->
<!--   * see details about a campus on the **Single Campus** view, including that campus's students -->
 <!--  * see details about a student on the **Single Student** view, including that student's campus -->

<!-- - Actions: as a user I... -->
  <!-- * can create a campus -->
  <!-- * can edit a campus's info, including adding/removing a student to/from that campus -->
  <!-- * can delete a campus -->
  <!-- * can create a student -->
  <!-- * can edit a student's info, including the campus that student is assigned to -->
  <!-- * can delete a student -->

<!-- ### Routes

```
GET
- all campuses
- a campus by id
- all students
- a student by id
```

```
POST
- new campus
- new student
```

```
PUT
- updated student info for one student
- updated campus info for one campus
```

```
DELETE
- a campus
- a student
``` -->

<!-- ### How to test functionality without a frontend
- GET: use your browser
- POST / PUT / DELETE : 
 - CLI (command line interface) with `curl`
   - e.g. `curl -H "Content-Type: application/json" -X POST -d '{"username":"kate","password":"1234"}' http://localhost:3000/api/login`
   - `-H`: headers. `-X`: verb. `-d`: data (must be of the type specified in headers). http://[address]:[port]/[route_path]
 - [Postman](https://www.getpostman.com/)
   ![](https://www.dropbox.com/s/4fk3b90cd0i1a5y/postman_post.png?raw=true)
- Databases: use Sequelize in your routes and see if you are receiving what you expect -->