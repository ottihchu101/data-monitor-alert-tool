function validateProducts(products) {
  const issues = [];
  const seenIds = new Set();

  products.forEach((product, index) => {
    const id = product.id || `index_${index}`;

    if (!product.title || !product.price || !product.image) {
      issues.push(`❌ Product ${id} is missing required fields.`);
    }

    if (product.price <= 0) {
      issues.push(`⚠️ Product ${id} has an invalid price: ${product.price}`);
    }

    if (seenIds.has(id)) {
      issues.push(`⚠️ Duplicate product ID found: ${id}`);
    } else {
      seenIds.add(id);
    }
  });

  return issues;
}

module.exports = validateProducts;
