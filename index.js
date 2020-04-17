const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentDB',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


//Get all student
app.get('/student', (req, res) => {
    mysqlConnection.query('SELECT * FROM student', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an student
app.get('/student/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM student WHERE studentID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an student
app.delete('/student/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM student WHERE studentID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an student
app.post('/student', (req, res) => {
    let emp = req.body;
    var sql = "SET @studentID = ?;SET @Name = ?;SET @studentCode = ?;SET @fees = ?; \
    CALL studentAddOrEdit(@studentID,@Name,@studentCode,@fees);";
    mysqlConnection.query(sql, [emp.studentID, emp.Name, emp.studentCode, emp.fees], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted studentID  : '+element[0].studentID);
            });
        else
            console.log(err);
    })
});

//Update an student
app.put('/student', (req, res) => {
    let emp = req.body;
    var sql = "SET @studentID= ?;SET @Name = ?;SET @studentCode = ?;SET @fees = ?; \
    CALL studentAddOrEdit(@studentID ,@Name,@studentCode,@fees);";
    mysqlConnection.query(sql, [emp.studentID, emp.Name, emp.studentCode, emp.fees], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});
