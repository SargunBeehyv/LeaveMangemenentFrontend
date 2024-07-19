import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/commonComp/Header';
import AdminSidebar from '../components/adminComp/AdminSidebar';
import Dashboard from '../components/adminComp/Dashboard';
import AddEmployeeComponent from '../components/adminComp/AddEmployeeComponent';
import ManageEmployee from '../components/adminComp/ManageEmployee';
import EmployeeLeave from '../components/adminComp/EmployeeLeave';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-4 mx-auto">
          <Routes>
            <Route path="dashboard" element={<Dashboard  />} />
            <Route path="add-employee" element={<AddEmployeeComponent />} />
            <Route path="manage-employee" element={<ManageEmployee  />} />
            <Route path="employee-leave" element={<EmployeeLeave  />} />
            <Route path="*"  />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;