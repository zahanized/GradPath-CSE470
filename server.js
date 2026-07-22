const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/question-vault.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Company-Specific Question.html'));
});

app.get('/question-vault', (req, res) => {
  res.redirect('/question-vault.html');
});
git status
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/verify-alumni', (req, res) => {
  const { studentId, gradYear } = req.body;
  try {
    const rawData = fs.readFileSync('./mockUniversityDB.json');
    const universityDatabase = JSON.parse(rawData);

    const recordFound = universityDatabase.find(
      student => student.studentId === studentId && student.gradYear === parseInt(gradYear)
    );

    if (recordFound) {
      return res.json({ verified: true, message: "Match found! Status successfully updated to Verified Mentor." });
    } else {
      return res.status(404).json({ verified: false, message: "Verification failed. No record found in university archives." });
    }
  } catch (error) {
    return res.status(500).json({ verified: false, message: "Server configuration error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});