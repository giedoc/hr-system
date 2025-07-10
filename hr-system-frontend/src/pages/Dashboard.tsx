import React, { useEffect, useState } from 'react';
import api from '../services/api';
import type { Employee } from '../types/Employee';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import { logout } from '../utils/logout';

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    setRole(payload.role);
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/employees', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const clearSelected = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <button className="btn btn-outline-secondary" onClick={logout}>
          Logout
        </button>
      </div>

      {role === 'admin' && (
        <EmployeeForm onAdd={fetchEmployees} onDone={clearSelected} employee={selectedEmployee} />
      )}
      <EmployeeList
        employees={employees}
        onEdit={handleEdit}
        onDelete={fetchEmployees}
        role={role}
      />
    </div>
  );
};

export default Dashboard;
