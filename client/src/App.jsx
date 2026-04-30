import { useState, useEffect, useCallback } from 'react';
import AlertTable from './components/AlertTable';
import TrendChart from './components/TrendChart';
import './App.css';

function App() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchAlerts = useCallback(async () => {
    try {
      const res = await fetch('/api/alerts');
      const data = await res.json();
      setAlerts(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  const runMonitor = async () => {
    setRunning(true);
    try {
      await fetch('/api/run-monitor', { method: 'POST' });
      await fetchAlerts();
    } catch (err) {
      console.error('Monitor run failed:', err);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1>Data Monitor</h1>
          <span className="subtitle">API Data Quality Dashboard</span>
        </div>
        <div className="header-right">
          {lastUpdated && (
            <span className="last-updated">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button className="run-btn" onClick={runMonitor} disabled={running}>
            {running ? '⏳ Running...' : '▶ Run Monitor Now'}
          </button>
        </div>
      </header>

      <main className="main">
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-number">{alerts.length}</span>
            <span className="stat-label">Total Alerts</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {alerts.filter(a => a.message?.includes('invalid price')).length}
            </span>
            <span className="stat-label">Price Issues</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {alerts.filter(a => a.message?.includes('missing')).length}
            </span>
            <span className="stat-label">Missing Fields</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {alerts.filter(a => a.message?.includes('Duplicate')).length}
            </span>
            <span className="stat-label">Duplicates</span>
          </div>
        </div>

        <section className="section">
          <h2>Alerts Over Time</h2>
          <TrendChart alerts={alerts} />
        </section>

        <section className="section">
          <h2>Recent Alerts</h2>
          {loading ? (
            <p className="loading">Loading alerts...</p>
          ) : alerts.length === 0 ? (
            <p className="empty">No alerts found. Run the monitor to check your data feed.</p>
          ) : (
            <AlertTable alerts={alerts} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
