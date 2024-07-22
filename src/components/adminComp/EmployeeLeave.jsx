import { useEffect, useState } from 'react';
import axios from 'axios';
import csrftoken from '/home/beehyv/Projects/Django/frontend/src/csrf.js';

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleString(); 
};
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const EmployeeLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const response = await axios.get('http://localhost:8000/api/staff_leave_view/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
          withCredentials: true,
        });
        setLeaveRequests(response.data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      await axios.post(`http://localhost:8000/api/staff_approve_leave/${id}/`, {}, {
        headers: {
          'X-CSRFToken': csrftoken,
          'Authorization': `Token ${token}`,
        },
        withCredentials: true,
      });
      setLeaveRequests(prevRequests => 
        prevRequests.map(request =>
          request.id === id ? { ...request, status: 1 } : request
        ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
    } catch (error) {
      console.error('Error approving leave request:', error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      await axios.post(`http://localhost:8000/api/staff_disapprove_leave/${id}/`, {}, {
        headers: {
          'X-CSRFToken': csrftoken,
          'Authorization': `Token ${token}`,
        },
        withCredentials: true,
      });
      setLeaveRequests(prevRequests => 
        prevRequests.map(request =>
          request.id === id ? { ...request, status: 2 } : request
        ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
    } catch (error) {
      console.error('Error rejecting leave request:', error);
    }
  };
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Employee Leave Requests</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr className="text-left">
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Name</th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Leave Type</th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Start Date</th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">End Date</th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs w-1/4">Reason</th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Apply Date</th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map(request => (
              <tr key={request.id} className="bg-gray-50">
                <td className="border-dashed border-t border-gray-200 px-6 py-4 font-bold">{request.staff_first_name}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{request.leave_type}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{formatDate(request.from_date)}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{formatDate(request.to_date)}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{request.message}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{formatCreatedAt(request.created_at)}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">
                  {request.status === 1 ? (
                    <span className="bg-green-500 text-white font-bold py-1 px-2 rounded text-xs mr-2">
                      Approved
                    </span>
                  ) : request.status === 2 ? (
                    <span className="bg-red-500 text-white font-bold py-1 px-2 rounded text-xs mr-2">
                      Disapproved
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
                      >
                        Not Approve
                      </button>
                    </>
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

export default EmployeeLeave;
