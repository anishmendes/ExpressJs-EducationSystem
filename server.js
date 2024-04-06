const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Dummy data
let students = [];
let teachers = [];
let classes = [];

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Students
app.get('/students', (req, res) => {
    res.render('students', { students });
});

app.post('/students', (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.redirect('/students');
});

// Teachers
app.get('/teachers', (req, res) => {
    res.render('teachers', { teachers });
});

app.post('/teachers', (req, res) => {
    const newTeacher = req.body;
    teachers.push(newTeacher);
    res.redirect('/teachers');
});

// Classes
app.get('/classes', (req, res) => {
    res.render('classes', { classes });
});

app.post('/classes', (req, res) => {
    const newClass = req.body;
    classes.push(newClass);
    res.redirect('/classes');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
