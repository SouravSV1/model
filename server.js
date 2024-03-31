// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PythonShell } = require('python-shell');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/Home', (req, res) => {
    res.send('Welcome to the backend server');
});
// Route to process input and make predictions using PyTorch model
app.post('/predict', (req, res) => {
    const { gender, race, parentalEducation, lunch, testPreparationCourse } = req.body;

    // Call Python script to process input and make predictions using PyTorch model
    PythonShell.run('process_data.py', { args: [gender, race, parentalEducation, lunch, testPreparationCourse] }, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const prediction = JSON.parse(results[0]);
            res.json(prediction);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
