const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Initialize
let records = [{
  Name: 'Lebohang',
  Surname: 'Marima',
  PhoneNumber: 256547377,
  Age: 30,
  JobDescription: 'Software Engineer',
  Salary: 50000
}];

//form for adding a new record
app.get('/add', (req, res) => {
  res.render('index');
});

// Route to handling
app.post('/add', (req, res) => {
  const newRecord = {
    Name: req.body.name,
    Surname: req.body.surname,
    PhoneNumber: req.body.phone,
    Age: parseInt(req.body.age),
    JobDescription: req.body.job,
    Salary: parseFloat(req.body.salary)
  };

  records.push(newRecord);
  res.redirect('/view');
});

// Route to view all records
app.get('/view', (req, res) => {
  if (records.length === 0) {
    res.send('No records found.');
  } else {
    res.render('view', { records });
  }
});
app.get('/view/desc', (req, res) => {
  const sortedRecords = [...records].sort((a, b) => a.Surname.localeCompare(b.Surname));
  res.render('view', { records: sortedRecords });
});

// Calculation sum and aver
app.get('/statistics', (req, res) => {
  const totalSalary = records.reduce((sum, record) => sum + record.Salary, 0);
  const averageSalary = totalSalary / records.length;

  res.send(`Total Salary: ${totalSalary} Rand<br>Average Salary: ${averageSalary} Rand`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
