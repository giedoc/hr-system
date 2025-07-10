const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

router.get('/', getAllEmployees);

router.post('/', addEmployee);

router.put('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);

module.exports = router;
