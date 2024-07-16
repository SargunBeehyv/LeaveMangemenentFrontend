import { useState, useEffect } from 'react';
import "../index.css";
import axios from "axios";

const LoginPage = () => {
    const [bgColor, setBgColor] = useState('bg-blue-500');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setBgColor((prevColor) => 
                prevColor === 'bg-blue-500' ? 'bg-green-500' : 'bg-blue-500'
            );
        }, 3500);

        return () => clearInterval(intervalId);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                email,
                password
            });
            if (response.data.status === 'success') {
                // Store token in localStorage or state
                localStorage.setItem('token', response.data.token);
                // Redirect based on the response
                window.location.href = response.data.redirect_url;
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Login failed');
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${bgColor} transition-colors duration-1000`}>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-3xl font-bold text-center mb-6">
                    <span className="text-blue-500">Bee</span>
                    <span className="text-green-500">Hyv</span>
                </h1>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email ID </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </div>
                    {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
