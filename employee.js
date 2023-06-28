const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Phone number contains 10 digits.',
    },
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
