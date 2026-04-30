const validateProducts = require('./validator');

describe('validateProducts', () => {
  const validProduct = { id: 1, title: 'Widget', price: 9.99, image: 'img.jpg' };

  test('returns no issues for valid products', () => {
    expect(validateProducts([validProduct])).toHaveLength(0);
  });

  test('flags missing title', () => {
    const issues = validateProducts([{ ...validProduct, title: null }]);
    expect(issues.some(i => i.includes('missing required fields'))).toBe(true);
  });

  test('flags missing price (falsy zero handled separately)', () => {
    const issues = validateProducts([{ ...validProduct, price: null }]);
    expect(issues.some(i => i.includes('missing required fields'))).toBe(true);
  });

  test('flags missing image', () => {
    const issues = validateProducts([{ ...validProduct, image: '' }]);
    expect(issues.some(i => i.includes('missing required fields'))).toBe(true);
  });

  test('flags price of zero as invalid', () => {
    const issues = validateProducts([{ ...validProduct, price: 0 }]);
    expect(issues.some(i => i.includes('invalid price'))).toBe(true);
  });

  test('flags negative price as invalid', () => {
    const issues = validateProducts([{ ...validProduct, price: -5 }]);
    expect(issues.some(i => i.includes('invalid price'))).toBe(true);
  });

  test('flags duplicate product IDs', () => {
    const issues = validateProducts([validProduct, { ...validProduct }]);
    expect(issues.some(i => i.includes('Duplicate product ID'))).toBe(true);
  });

  test('handles products without an id using index as fallback', () => {
    const noId = { title: 'No ID', price: 5, image: 'img.jpg' };
    const issues = validateProducts([noId]);
    expect(issues).toHaveLength(0);
  });

  test('returns multiple issues for one product', () => {
    const bad = { id: 99, title: null, price: 0, image: '' };
    const issues = validateProducts([bad]);
    expect(issues.length).toBeGreaterThanOrEqual(2);
  });

  test('returns no issues for empty array', () => {
    expect(validateProducts([])).toHaveLength(0);
  });
});
