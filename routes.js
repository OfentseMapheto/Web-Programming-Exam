const express = require('express');
const Employee = require('./models/employee');

const router = express.Router();

// Add
router.post('/add', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ success: true, message: 'Employee added successfully.' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// View details
router.get('/view/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }
    res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update
router.put('/update/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }
    res.status(200).json({ success: true, message: 'Employee updated successfully.' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete
router.delete('/delete/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }
    res.status(200).json({ success: true, message: 'Employee deleted successfully.' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
