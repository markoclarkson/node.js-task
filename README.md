# Student REST API

A small REST API built with Node.js, Express, and MySQL for managing student records — supports listing, fetching, creating/updating, and deleting students.

## Endpoints

| Method | Route          | Description                          |
|--------|----------------|---------------------------------------|
| GET    | `/student`     | Returns all students                  |
| GET    | `/student/:id` | Returns a single student by ID        |
| POST   | `/student`     | Creates a new student record          |
| PUT    | `/student`     | Updates an existing student record    |
| DELETE | `/student/:id` | Deletes a student by ID                |

Create/update both call a `studentAddOrEdit` stored procedure on the MySQL side, using session variables to pass in the student fields.

## Tech stack

- Node.js
- Express
- MySQL (`mysql` npm package)
- body-parser for JSON request bodies

## Setup

1. Install dependencies:
```bash
   npm install
```
2. Create a MySQL database and import the schema:
```bash
   mysql -u root -p studentDB < student.sql
```
   (Note: the SQL dump defines the `student` table; you'll also need to create the `studentAddOrEdit` stored procedure referenced in `index.js`, since it isn't included in the dump.)
3. Update the DB connection settings in `index.js` if your MySQL user/password differ from the local defaults (`root`, no password).
4. Start the server:
```bash
   node index.js
```
   The API runs on `http://localhost:3000`.

## Example request

```bash
curl -X POST http://localhost:3000/student \
  -H "Content-Type: application/json" \
  -d '{"studentID": 2, "Name": "Jane", "studentCode": "EMP91", "fees": 45000}'
```
