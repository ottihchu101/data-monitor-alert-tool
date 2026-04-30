import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function buildChartData(alerts) {
  const counts = {};
  alerts.forEach(alert => {
    const day = new Date(alert.timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    counts[day] = (counts[day] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([date, count]) => ({ date, count }))
    .slice(-14); // last 14 days
}

function TrendChart({ alerts }) {
  const data = buildChartData(alerts);

  if (data.length === 0) {
    return <p className="empty">No data yet. Run the monitor to populate the chart.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
        <XAxis dataKey="date" tick={{ fill: '#aaa', fontSize: 12 }} />
        <YAxis allowDecimals={false} tick={{ fill: '#aaa', fontSize: 12 }} />
        <Tooltip
          contentStyle={{ background: '#1e1e2e', border: '1px solid #3a3a4a', borderRadius: 8 }}
          labelStyle={{ color: '#fff' }}
          itemStyle={{ color: '#7c6af7' }}
        />
        <Bar dataKey="count" fill="#7c6af7" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TrendChart;
