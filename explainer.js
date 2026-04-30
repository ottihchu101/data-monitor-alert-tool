const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function explainAlerts(issues) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️ GEMINI_API_KEY not set, skipping explanations.');
    return issues.map(issue => ({ issue, explanation: null }));
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a data quality analyst. The following issues were detected in a product data feed. For each issue, write a single plain English sentence explaining what went wrong and why it matters. Return a JSON array where each item has "issue" and "explanation" fields.

Issues:
${issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

Return only valid JSON, no markdown.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error('❌ [explainer.js] Gemini error:', err.message);
    return issues.map(issue => ({ issue, explanation: null }));
  }
}

module.exports = explainAlerts;
