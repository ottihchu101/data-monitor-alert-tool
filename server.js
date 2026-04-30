const express = require('express');
const path = require('path');
const supabase = require('./db');
const runMonitor = require('./index');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/alerts', async (req, res) => {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    return res.status(500).json({ error: 'Failed to load alerts' });
  }

  res.json(data);
});

app.post('/api/run-monitor', async (req, res) => {
  try {
    await runMonitor();
    res.json({ success: true, message: 'Monitor run complete.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Dashboard running at http://localhost:${PORT}`);
});
