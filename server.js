const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Dummy data for students
let students = [
    { id: 1, name: 'Anish Mainali', age: 20, grade: 'A' },
    { id: 2, name: 'Sahil Newar', age: 22, grade: 'B' },
    { id: 3, name: 'MR BOB', age: 21, grade: 'A-' }
];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes

// Display all students
app.get('/students', (req, res) => {
    res.render('students', { students });
});

// Show form to add a new student
app.get('/students/new', (req, res) => {
    res.render('new-student');
});

// Create a new student
app.post('/students', (req, res) => {
    const { name, age, grade } = req.body;
    const id = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    students.push({ id, name, age, grade });
    res.redirect('/students');
});

// Show form to edit a student
app.get('/students/:id/edit', (req, res) => {
    const student = students.find(student => student.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student not found.');
    res.render('edit-student', { student });
});

// Update a student
app.put('/students/:id', (req, res) => {
    const { name, age, grade } = req.body;
    const student = students.find(student => student.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student not found.');
    student.name = name;
    student.age = age;
    student.grade = grade;
    res.redirect('/students');
});

// Delete a student
app.delete('/students/:id', (req, res) => {
    students = students.filter(student => student.id !== parseInt(req.params.id));
    res.redirect('/students');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
