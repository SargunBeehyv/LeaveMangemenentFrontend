import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};


const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employees/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);


  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:8000/api/employees/${employeeId}/`);
      setEmployees(employees.filter(employee => employee.id !== employeeId));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };



  return (
    <div className="mx-0 py-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Employees</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr className="text-left">
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Full Name
              </th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Username
              </th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Email
              </th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Gender
              </th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Joining Date
              </th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Manage
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{employee.fullName}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{employee.username}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{employee.email}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{employee.gender}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{formatDate(employee.joiningDate)}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">
                  <div className="flex items-center space-x-2">
                   
                    <button onClick={() => handleDelete(employee.id)} className="text-red-500 hover:text-red-600">
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default ManageEmployee;
