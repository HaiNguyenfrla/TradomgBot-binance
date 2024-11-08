const express = require('express');
const cors = require('cors');  // Import cors
const binanceRoutes = require('./routes/binanceRoutes');

const app = express();
const port = 5000;

app.use(cors());  // Enable CORS
app.use(express.json());
app.use('/api', binanceRoutes);

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
