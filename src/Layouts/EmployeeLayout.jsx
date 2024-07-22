// EmployeeLayout.js
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import Header from '../components/commonComp/Header';
import Dashboard from '../components/employeeComp/Dashboard';
import ApplyLeave from '../components/employeeComp/ApplyLeave';
import LeaveHistory from '../components/employeeComp/LeaveHistory';

const EmployeeLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          navigate('/login', { replace: true });
          return;
        }
        const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Token invalid');
        }
        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      }
    };
  
    fetchUserDetails();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      await axios.post('http://127.0.0.1:8000/api/logout/', {}, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      localStorage.removeItem('token');

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-gray-100 p-4">
          <nav className='mt-9'>
            <ul>
              {user && (
                <>
                  <li>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUap8S-5kNNUnDXcynSZeIaFnKNISGf7CN3Q&s" alt="Profile" className="mt-9 w-24 h-28 rounded-full mb-4 border-2 border-white"/>
                  </li>
                  <li>
                    <p className="mb-2 block py-2 px-4 text-black-600 font-bold">{user.username}</p>
                  </li>
                </>
              )}
              <li><Link to="/employee/dashboard" className="mb-2 block py-2 px-4 text-blue-600 hover:bg-blue-100">Dashboard</Link></li>
              <li><Link to="/employee/apply-leave" className="mb-2 block py-2 px-4 text-blue-600 hover:bg-blue-100">Apply Leave</Link></li>
              <li><Link to="/employee/leave-history" className="mb-2 block py-2 px-4 text-blue-600 hover:bg-blue-100">Leave History</Link></li>
              <li><button onClick={handleSignOut} className="mb-2 block w-full text-left py-2 px-4 text-red-600 hover:bg-blue-100">Sign Out</button></li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="apply-leave" element={<ApplyLeave />} />
            <Route path="leave-history" element={<LeaveHistory />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
