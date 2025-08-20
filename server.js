const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB (server.js)'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Schema and model
const alertSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: Number,
  message: String,
});


const Alert = mongoose.model('Alert', alertSchema);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// API route for frontend to fetch alerts
app.get('/api/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    console.log("📡 Sending alerts to frontend:", alerts); 
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load alerts' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Dashboard running at http://localhost:${PORT}`);
});
