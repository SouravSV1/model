import React, { useEffect, useState } from 'react';
import CircularBarGraph from './CircularBarGraph/CircularBarGraph'; 
import './result.scss';
import axios from 'axios'; 

const Result: React.FC = () => {
  // Assuming your JSON structure is like { "math": 85, "reading": 75, "writing": 90 }
  // const data = require('../../Assets/predictions.json'); // Update the JSON file path
  const [scores, setScores] = useState({
    math: null,
    reading: null,
    writing: null
  });

  useEffect(() => {
    fetch('http://localhost:3000/predict') // Update the URL with your backend endpoint
    .then(response => response.json())
    .then(data => {
      setScores(data);
    })
    .catch(error => {
      console.error('Error fetching scores:', error);
    });
}, []);

  const getResultDescription = (subject: string, score: number) => {
    if (score === null || isNaN(score)) {
      return `Loading ${subject} score...`;
    } else if (score >= 85) {
      return `Excellent! Your ${subject} score is very high.`;
    } else if (score >= 70) {
      return `Good job! Your ${subject} score is above average.`;
    } else if (score >= 50) {
      return `Keep practicing! Your ${subject} score is average or slightly below.`;
    } else {
      return `Uh oh! Your ${subject} score needs improvement. Let's work together to improve it.`;
    }
  };

  return (
    <div className="result-container">
      <div className="result-percentage-circle">
        <div>
          <CircularBarGraph sgpa={scores.math} />
          <p className="result-description">{getResultDescription('Math', scores.math)}</p>
        </div>
        <div>
          <CircularBarGraph sgpa={scores.reading} />
          <p className="result-description">{getResultDescription('Reading', scores.reading)}</p>
        </div>
        <div>
          <CircularBarGraph sgpa={scores.writing} />
          <p className="result-description">{getResultDescription('Writing', scores.writing)}</p>
        </div>
      </div>
    </div>
  );
};

export default Result;
