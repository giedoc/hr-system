import React from 'react';
import type { Employee } from '../types/Employee';
import api from '../services/api';

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: () => void;
  role: string | null;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit, onDelete }) => {
  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this employee?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete();
    } catch (err) {
      console.error(err);
      alert('Failed to delete employee');
    }
  };

  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <div>
      <h3>Employee List</h3>
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(emp)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
