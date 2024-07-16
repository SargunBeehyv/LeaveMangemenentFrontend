import { useEffect, useState } from 'react';
import axios from 'axios';
import csrftoken from '/home/beehyv/Projects/Django/frontend/src/csrf.js';

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleString(); // Adjust locale and options as needed
};

const ApprovalButtons = ({ onApprove, onReject }) => (
  <div className="flex flex-col space-y-2">
    <button 
      onClick={onApprove}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs"
    >
      Approve
    </button>
    <button 
      onClick={onReject}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
    >
      Not Approve
    </button>
  </div>
);

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
      // Update leaveRequests state by filtering out the approved leave
      setLeaveRequests(leaveRequests.map(request =>
        request.id === id ? { ...request, status: 1 } : request
      ));
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
      // Update leaveRequests state by filtering out the disapproved leave
      setLeaveRequests(leaveRequests.map(request =>
        request.id === id ? { ...request, status: 2 } : request
      ));
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
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Approval</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr key={request.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{request.staff_id.admin.username}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{request.leave_type}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{request.from_date}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{request.to_date}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{request.message}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">{formatCreatedAt(request.created_at)}</td>
                <td className="border-dashed border-t border-gray-200 px-6 py-4">
                  {request.status === 0 ? (
                    <ApprovalButtons 
                      onApprove={() => handleApprove(request.id)}
                      onReject={() => handleReject(request.id)}
                    />
                  ) : (
                    request.status === 1 ? (
                      <span className="bg-green-100 text-green-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        Approved
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        Not Approved
                      </span>
                    )
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
