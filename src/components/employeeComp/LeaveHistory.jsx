import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '/home/beehyv/Projects/Django/frontend/src/index.css';

const FormattedMessage = ({ message }) => {
  return (
    <div className="whitespace-pre-wrap break-words max-w-xs">
      {message.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index !== message.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
};

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const response = await axios.get('http://localhost:8000/api/leave-history/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        const formattedData = response.data.map(leave => ({
          ...leave,
          leave_type: capitalizeFirstLetter(leave.leave_type),
          from_date: formatDate(leave.from_date),
          to_date: formatDate(leave.to_date),
        }));
        setLeaveHistory(formattedData);
      } catch (error) {
        console.error('Error fetching leave history:', error);
      }
    };
    fetchData();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Approved';
      case 2:
        return 'Not Approved';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Leave History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">End Date</th>
              <th className="py-3 px-4 text-left">Leave Type</th>
              <th className="py-3 px-4 text-left">Message</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveHistory.map((leave, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-3 px-4">{leave.from_date}</td>
                <td className="py-3 px-4">{leave.to_date}</td>
                <td className="py-3 px-4">{leave.leave_type}</td>
                <td className="py-3 px-4">
                  <FormattedMessage message={leave.message} />
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    leave.status === 1 ? 'bg-green-100 text-green-800' :
                    leave.status === 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {getStatusText(leave.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;