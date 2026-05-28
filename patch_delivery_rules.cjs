const fs = require('fs');
const path = require('path');
const root = process.cwd();

const adminDashboardPath = path.join(root, 'src/pages/AdminDashboard.tsx');
const cartPath = path.join(root, 'src/components/Cart.tsx');

let adminContent = fs.readFileSync(adminDashboardPath, 'utf8');
adminContent = adminContent.replace(
"const parsePeso = (value: string) => Number(value.replace(/[^-9.-]/g, '')) || 0;\nconst formatPeso = (value: number) => `₱${value.toFixed(2)}`;\nconst getDeliveryFeeForMinOrder = (minOrderValue: number) => {\n  if (minOrderValue >= 2000) return 200;\n  if (minOrderValue >= 1000) return 100;\n  return 50;\n};",
"const parsePeso = (value: string) => Number(value.replace(/[^\\d.-]/g, '')) || 0;\nconst formatPeso = (value: number) => `₱${value.toFixed(2)}`;\nconst getDeliveryFeeForMinOrder = (minOrderValue: number, rules: { minOrder: string; fee: string }[]) => {\n  const parsedRules = rules\n    .map((rule) => ({ minOrder: parsePeso(rule.minOrder), fee: parsePeso(rule.fee) }))\n    .filter((rule) => !isNaN(rule.minOrder) && !isNaN(rule.fee))\n    .sort((a, b) => b.minOrder - a.minOrder);\n\n  const match = parsedRules.find((rule) => minOrderValue >= rule.minOrder);\n  return match ? match.fee : 0;\n};"
);
if (!adminContent.includes('const getDeliveryFeeForMinOrder = (minOrderValue: number, rules')) {
  fs.writeFileSync(adminDashboardPath, adminContent, 'utf8');
  console.log('Updated AdminDashboard helper');
} else {
  console.log('AdminDashboard helper already updated or pattern not found');
}

let cartContent = fs.readFileSync(cartPath, 'utf8');
cartContent = cartContent.replace(
"  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);\n  const subtotal = cart.reduce((acc, item) => {\n    const price = parseFloat(item.price.replace(/[^\\d.-]/g, ''));\n    return acc + (price * item.quantity);\n  }, 0);\n  \n  const deliveryFee = orderType === 'delivery' ? parseFloat(data.settings.deliveryFee.replace(/[^\\d.-]/g, '')) : 0;\n  const total = subtotal + deliveryFee;\n\n  const updateQuantity = (name: string, delta: number) => {",
"  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);\n  const subtotal = cart.reduce((acc, item) => {\n    const price = parseFloat(item.price.replace(/[^\\d.-]/g, ''));\n    return acc + (price * item.quantity);\n  }, 0);\n  \n  const parsePeso = (value: string) => Number(value.replace(/[^\\d.-]/g, '')) || 0;\n  const getDeliveryFeeForOrderTotal = (orderTotal: number, rules: { minOrder: string; fee: string }[]) => {\n    const parsedRules = rules\n      .map((rule) => ({ minOrder: parsePeso(rule.minOrder), fee: parsePeso(rule.fee) }))\n      .filter((rule) => !isNaN(rule.minOrder) && !isNaN(rule.fee))\n      .sort((a, b) => b.minOrder - a.minOrder);\n\n    const match = parsedRules.find((rule) => orderTotal >= rule.minOrder);\n    return match ? match.fee : 0;\n  };\n\n  const deliveryRules = data.settings.deliveryRules ?? [\n    { minOrder: '₱500.00', fee: '₱50.00' },\n    { minOrder: '₱1000.00', fee: '₱100.00' },\n    { minOrder: '₱2000.00', fee: '₱200.00' }\n  ];\n  const deliveryFee = orderType === 'delivery'\n    ? getDeliveryFeeForOrderTotal(subtotal, deliveryRules)\n    : 0;\n  const total = subtotal + deliveryFee;\n\n  const updateQuantity = (name: string, delta: number) => {"
);
if (!cartContent.includes('const getDeliveryFeeForOrderTotal = (orderTotal: number, rules')) {
  fs.writeFileSync(cartPath, cartContent, 'utf8');
  console.log('Updated Cart fee logic');
} else {
  console.log('Cart fee logic already updated or pattern not found');
}
