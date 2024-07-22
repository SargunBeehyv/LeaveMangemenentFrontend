import { Link, useNavigate } from 'react-router-dom';
import "/home/beehyv/Projects/Django/frontend/src/index.css"

const AdminSidebar = ({ onSignOut }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      // Call the logout API
      const response = await fetch('http://127.0.0.1:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

 
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div className="bg-gray-500 text-white w-64 min-h-screen p-4 flex flex-col">
      <div className="flex flex-col items-center mb-8">
        <img 
          src="https://media.licdn.com/dms/image/C4D0BAQElljgIksqivg/company-logo_200_200/0/1630545852819/beehyv_software_solutions_private_limited_logo?e=2147483647&v=beta&t=6oc_TQI8bqy8dBfeZAmMbS0BZrMFoQBJlptQJJ-aR0Y" 
          alt="Admin" 
          className="mt-9 w-24 h-24 rounded-full mb-4 border-2 border-white"
        />
        <span className="text-sm">BeehyvAdmin</span>
      </div>
      
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link to="/admin/dashboard" className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/add-employee" className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors">
              Add Employee
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-employee" className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors">
              Manage Employee
            </Link>
          </li>
          <li>
            <Link to="/admin/employee-leave" className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors">
              Employee Leave
            </Link>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors text-red-300 hover:text-red-100"
            >
              Sign Out
            </button>
          </li>
        </ul>  
      </nav>
    </div>
  );
};

export default AdminSidebar;