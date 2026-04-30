const supabase = require('./db');

async function logAlerts(issues, explanations = []) {
  const alertDocs = issues.map((issue, i) => {
    const idMatch = issue.match(/Product (\d+)/);
    return {
      product_id: idMatch ? parseInt(idMatch[1]) : null,
      message: issue,
      explanation: explanations[i]?.explanation || null,
      timestamp: new Date().toISOString(),
    };
  });

  if (alertDocs.length === 0) {
    console.log('⚠️ [logger.js] No alerts to save.');
    return;
  }

  const { error } = await supabase.from('alerts').insert(alertDocs);

  if (error) {
    console.error('❌ [logger.js] Supabase insert failed:', error.message);
  } else {
    console.log(`📦 [logger.js] Inserted ${alertDocs.length} alerts into Supabase.`);
  }
}

module.exports = logAlerts;
