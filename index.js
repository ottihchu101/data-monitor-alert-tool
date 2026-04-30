const axios = require('axios');
const validateProducts = require('./validator');
const sendAlert = require('./alerter');
const logAlerts = require('./logger');
const explainAlerts = require('./explainer');
require('dotenv').config();

async function fetchAndCheckProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    // Inject fake bad data for testing
    products[0].price = 0;
    products[1].title = null;
    products[2].image = '';
    products.push(products[2]); // duplicate

    const issues = validateProducts(products);
    console.log('🧪 [index.js] Issues found:', issues);

    if (issues.length > 0) {
      const explanations = await explainAlerts(issues);
      await logAlerts(issues, explanations);
      sendAlert(issues);
    } else {
      console.log('✅ No issues found.');
    }
  } catch (error) {
    console.error('❌ [index.js] API error:', error.message);
  }
}

if (require.main === module) {
  fetchAndCheckProducts();
}

module.exports = fetchAndCheckProducts;
