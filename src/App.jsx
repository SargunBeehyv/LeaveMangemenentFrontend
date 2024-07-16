import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import LoginPage from './components/LoginPage';
import EmployeeLayout from './Layouts/EmployeeLayout';
import AdminLayout from './Layouts/AdminLayout';
import axios from 'axios';
import  { useEffect } from 'react';

function App() {

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        await axios.get('http://localhost:8000/api/set_csrf_token/');
      } catch (error) {
        console.error('Error setting CSRF token:', error);
      }
    };
    getCsrfToken();
  }, []);



  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employee/*" element={<EmployeeLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;