const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
 
const app = express();
const PORT = process.env.PORT ||  5502;
 
app.use(cors());
 
// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'QuizApp',
    port: 3306
});
 
// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database...');
});
 
// Middleware for parsing JSON body
app.use(express.json());
 
// API endpoint for saving quiz questions
app.post('/api/questions', (req, res) => {
    const { question, option1, option2, option3, option4, correctOption } = req.body;
 
    // Insert the question into the database
    const sql = 'INSERT INTO quizQuestions (quizId, question, option1, option2, option3, option4, correctOption) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [1, question, option1, option2, option3, option4, correctOption]; // Replace 1 with actual quizId
 
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error saving question:', err);
            res.status(500).json({ error: 'An error occurred while saving the question.' });
        } else {
            console.log('Question saved successfully:', result);
            res.status(201).json({ message: 'Question saved successfully.' });
        }
    });
});
 
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 
