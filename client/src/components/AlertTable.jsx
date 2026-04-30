function AlertTable({ alerts }) {
  return (
    <div className="table-wrapper">
      <table className="alert-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Product ID</th>
            <th>Issue</th>
            <th>Explanation</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map(alert => (
            <tr key={alert.id}>
              <td className="td-time">
                {new Date(alert.timestamp).toLocaleString()}
              </td>
              <td className="td-id">{alert.product_id ?? '—'}</td>
              <td className="td-message">{alert.message}</td>
              <td className="td-explanation">
                {alert.explanation ?? <span className="no-explanation">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlertTable;
