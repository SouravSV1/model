
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.scss';
import axios from 'axios';

const Home = (props) => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [parentalEducation, setParentalEducation] = useState('');
  const [lunch, setLunch] = useState('');
  const [testPreparationCourse, setTestPreparationCourse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to the backend
    const formData = new FormData();
    formData.append('gender', gender);
    formData.append('race', race);
    formData.append('parentalEducation', parentalEducation);
    formData.append('lunch', lunch);
    formData.append('testPreparationCourse', testPreparationCourse);

    // For demonstration purposes only, replace this with your own API call
//     axios.post('http://localhost:3001/predict', formData)
//     .then((response) => {
//       console.log(response.data);
//       // Reset form fields
//       setGender('');
//       setRace('');
//       setParentalEducation('');
//       setLunch('');
//       setTestPreparationCourse('');
//       // Navigate to the next page
//       navigate('/Result');
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
      fetch('http://localhost:3000/predict', {
      method: 'POST',
      body: JSON.stringify({
        gender,
        race,
        parentalEducation,
        lunch,
        testPreparationCourse
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        // Reset form fields
        // setGender('');
        // setRace('');
        // setParentalEducation('');
        // setLunch('');
        // setTestPreparationCourse('');
        // Navigate to the next page
         navigate('/predict');

      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="home container">
        <form onSubmit={handleSubmit}>
         <div className="home-contents container">
          <h3 className="details">Enter Your Details</h3>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              className="input flex"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Enter gender"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="race">Race/Ethnicity</label>
            <input
              type="text"
              className="input flex"
              id="race"
              value={race}
              onChange={(e) => setRace(e.target.value)}
              placeholder="Enter race/ethnicity"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="parentalEducation">Parental Level of Education</label>
            <input
              type="text"
              className="input flex"
              id="parentalEducation"
              value={parentalEducation}
              onChange={(e) => setParentalEducation(e.target.value)}
              placeholder="Enter parental level of education"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lunch">Lunch</label>
            <input
              type="text"
              className="input flex"
              id="lunch"
              value={lunch}
              onChange={(e) => setLunch(e.target.value)}
              placeholder="Enter lunch"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="testPreparationCourse">Test Preparation Course</label>
            <input
              type="text"
              className="input flex"
              id="testPreparationCourse"
              value={testPreparationCourse}
              onChange={(e) => setTestPreparationCourse(e.target.value)}
              placeholder="Enter test preparation course"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Continue to Predict 
          </button>
         </div> 
        </form>
    </div>
  );
};

export default Home;
