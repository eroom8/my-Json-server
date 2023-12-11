const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// GET endpoint to retrieve data from data.json
app.get('/api/data', (req, res) => {
  try {
    const data = fs.readFileSync('data.json', 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// POST endpoint to store form data in data.json
app.post('/api/data', (req, res) => {
    try {
      const newData = req.body;
      
      // Read existing data from data.json
      const existingData = fs.existsSync('data.json') 
        ? JSON.parse(fs.readFileSync('data.json', 'utf8'))
        : [];
  
      // Ensure existingData is an array
      const updatedData = Array.isArray(existingData) ? [...existingData, newData] : [newData];
  
      // Write updated data back to data.json
      fs.writeFileSync('data.json', JSON.stringify(updatedData, null, 2));
  
      res.json({ success: true, message: 'Data submitted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
