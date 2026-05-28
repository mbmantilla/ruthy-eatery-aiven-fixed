import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src/pages/AdminDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the malformed regex using a regex pattern
// The issue is /[^-9.-]/g should be /[^\d.-]/g
const oldPattern = /Number\(value\.replace\(\/\[\^-9\.\.-\]\/g, ''\)\) \|\| 0/;
const newReplacement = "Number(value.replace(/[^\\d.-]/g, '')) || 0";

if (oldPattern.test(content)) {
  content = content.replace(oldPattern, newReplacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ Fixed malformed regex in parsePeso');
} else {
  console.log('✗ Pattern not found');
  // Try with escaped variant
  const pattern2 = /Number\(value\.replace\(\/\[\^[^/]+\/g, ''\)\) \|\| 0/;
  const match = content.match(pattern2);
  if (match) {
    console.log('Found alternative match:', match[0].substring(0, 80));
    content = content.replace(pattern2, newReplacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ Fixed with alternative pattern');
  } else {
    // Just show what's on line 38
    const lines = content.split('\n');
    const line38 = lines[37];
    console.log('Line 38:', line38);
    console.log('Line 38 length:', line38.length);
    console.log('Bytes:', Buffer.from(line38).toString('hex').substring(0, 200));
  }
}
