import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Create user object
    const user = {
      name,
      email,
    };

    // Make a POST request to the Go backend
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert('User created successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Clear form
    setName('');
    setEmail('');
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
