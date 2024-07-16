import { useEffect, useState } from 'react';
import axios from 'axios';
import '/home/beehyv/Projects/Django/frontend/src/index.css';


const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString();
  return formattedDate;
};

const Dashboard = () => {
  const [leaveDetails, setLeaveDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const result = await axios.get('http://localhost:8000/api/dashboard/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        // Map through the data and format dates and capitalize leave type
        const formattedData = result.data.map(leave => ({
          ...leave,
          leave_type: capitalizeFirstLetter(leave.leave_type),
          from_date: formatDate(leave.from_date),
          to_date: formatDate(leave.to_date),
          created_at: formatDate(new Date(leave.created_at)),
        }));
        setLeaveDetails(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Employee Leave Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Leave Type</th>
              <th className="py-3 px-4 text-left">Leave Start</th>
              <th className="py-3 px-4 text-left">Leave End</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveDetails.map((leave, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-3 px-4">{leave.leave_type}</td>
                <td className="py-3 px-4">{leave.from_date}</td>
                <td className="py-3 px-4">{leave.to_date}</td>
                <td className="py-3 px-4">{leave.created_at}</td>
                <td className="py-3 px-4">
                  {leave.status === 0 ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  ) : (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      leave.status === 1 ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {leave.status === 1 ? 'Approved' : 'Not Approved'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
