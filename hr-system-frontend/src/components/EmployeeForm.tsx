import React, { useEffect, useState } from 'react';
import api from '../services/api';
import type { Employee } from '../types/Employee';

interface EmployeeFormProps {
  onAdd?: () => void;
  onDone?: () => void;
  employee?: Employee | null;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onAdd, onDone, employee }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        position: employee.position,
        department: employee.department,
        salary: employee.salary.toString(),
      });
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      if (employee) {
        // update
        await api.put(
          `/employees/${employee.id}`,
          { ...formData, salary: Number(formData.salary) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // create
        await api.post(
          '/employees',
          { ...formData, salary: Number(formData.salary) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setFormData({ name: '', email: '', position: '', department: '', salary: '' });
      if (onAdd) onAdd();
      if (onDone) onDone();
    } catch (err) {
      console.error(err);
      setError('Failed to submit form');
    }
  };

  return (
    <div>
      <h3>{employee ? 'Update Employee' : 'Add New Employee'}</h3>
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'position', 'department', 'salary'].map((field) => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <br />
            <input
              type={field === 'salary' ? 'number' : 'text'}
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">{employee ? 'Update' : 'Add'}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default EmployeeForm;
