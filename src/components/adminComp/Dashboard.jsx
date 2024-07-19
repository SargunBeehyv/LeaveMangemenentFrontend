import  { useEffect, useState } from 'react';
import axios from 'axios';
import "/home/beehyv/Projects/Django/frontend/src/index.css";

const DashboardBox = ({ title, count, bgColor }) => (
  <div className={`${bgColor} rounded-lg shadow-lg p-6 w-64 text-center`}>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-3xl font-bold text-gray-900">{count}</p>
  </div>
);

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [employeesOnLeave, setEmployeesOnLeave] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        const response = await axios.get('http://localhost:8000/api/home/',{
          headers: {
            'Authorization': `Token ${token}`,
        }});
        setTotalEmployees(response.data.staff_count);
        setEmployeesOnLeave(response.data.leave_count);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ml-64 flex flex-col items-start justify-center h-full pl-0">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Dashboard Overview</h2>
      <div className="flex space-x-8">
        <DashboardBox 
          title="Total Employees" 
          count={totalEmployees} 
          bgColor="bg-blue-300"
        />
        <DashboardBox 
          title="Total  Leaves" 
          count={employeesOnLeave} 
          bgColor="bg-green-300"
        />
      </div>
    </div>
  );
};

export default Dashboard;
