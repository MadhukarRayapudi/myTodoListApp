import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './index.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'gender':
        setGender(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, name, gender })
    })
      .then(async (response) => {
        if (!response.ok) {
          const json = await response.json();
          throw new Error(json.message || 'Signup failed');
        }
        return response.json();
      })
      .then(() => {
        // alert('Signup successful!');
        setUsername('');
        setPassword('');
        setName('');
        setGender('male');
        navigate('/login'); // Redirect to login page after successful signup
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        alert('Signup failed: ' + error.message);
      });
  };

  return (
    <div className="signup-page">
      <h1 className="signup-page-heading">Signup Here</h1>
      <form onSubmit={handleSubmit} className = "signup-form">
        <div>
          <label htmlFor="username" className = "label">Username:</label>
          <br/>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className = "label">Password:</label>
          <br/>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className = "sign-upform-input"
            required
          />
        </div>
        <div>
          <label htmlFor="name" className = "label">Name:</label>
          <br/>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className = "sign-upform-input"
            required
          />
        </div>
        <div>
          <label htmlFor="gender" className = "label gender-text">Gender:</label>
          <br/>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={handleChange}
            className = "sign-upform-input select-bar"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className = "signup-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
