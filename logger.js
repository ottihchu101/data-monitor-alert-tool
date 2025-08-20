const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ [logger.js] Connected to MongoDB'))
  .catch(err => console.error('❌ [logger.js] MongoDB connection error:', err));

// Schema
const alertSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: Number,
  message: String,
});

// Model
const Alert = mongoose.model('Alert', alertSchema);

// Save alerts
async function logAlerts(issues) {
  const alertDocs = issues.map(issue => {
    const idMatch = issue.match(/Product (\d+)/);
    const parsedId = idMatch ? parseInt(idMatch[1]) : null;

    return {
      productId: parsedId,
      message: issue,
      timestamp: new Date(),
    };
  });

  console.log("📝 [logger.js] Prepared alert docs:", alertDocs);

  if (alertDocs.length === 0) {
    console.log("⚠️ [logger.js] No alerts to save.");
    return;
  }

  try {
    const result = await Alert.insertMany(alertDocs);
    console.log(`📦 [logger.js] Inserted ${result.length} alerts into MongoDB!`);
  } catch (err) {
    console.error("❌ [logger.js] MongoDB insert failed:", err.message);
  }
}

module.exports = logAlerts;
