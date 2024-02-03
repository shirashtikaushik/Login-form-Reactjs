import React, { useState } from 'react';
import Login from './Components/Login';
//import User from './User';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ setUser] = useState(null);

  const handleLogin = ({ email, password }) => {
    // Assume a simple authentication logic for demonstration
    if (email === 'test@example.com' && password === 'password') {
      setUser({
        name: 'John Doe',
        email: 'test@example.com',
      });
    } else {
      setError('Invalid credentials');
    }
  };

  const [ setError] = useState('');

  return (
    <div>
      {/* {user ? (
        <User user={user} />
      ) : ( */}
        <Login onLogin={handleLogin} />
      
    </div>
  );
}

export default App;
