

import { Email } from '@material-ui/icons';
import React, { useState } from 'react';

const LoginForm: React.FC = () => {
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:26429/api/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email, password }),
            }); 

            if (response.ok) {
                const result = await response.json();
                //console.log(result); 
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }       
    };

    
    return (
        <div>
            <label>
                Email:
                <input type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
