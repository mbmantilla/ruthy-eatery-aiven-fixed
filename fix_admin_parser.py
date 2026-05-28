#!/usr/bin/env python
from pathlib import Path

file_path = Path('src/pages/AdminDashboard.tsx')
content = file_path.read_text(encoding='utf-8')

# Fix: Replace malformed regex [^-9.-] with [^\d.-]
# Also fix the peso symbol
old_line = "const parsePeso = (value: string) => Number(value.replace(/[^-9.-]/g, '')) || 0;"
new_line = "const parsePeso = (value: string) => Number(value.replace(/[^\\d.-]/g, '')) || 0;"

if old_line in content:
    content = content.replace(old_line, new_line)
    print(f"✓ Fixed malformed regex in parsePeso")
else:
    print(f"⚠ parsePeso regex not found - it may already be fixed")

# Fix peso symbol encoding
old_peso = "const formatPeso = (value: number) => `â‚±${value.toFixed(2)}`;"
new_peso = "const formatPeso = (value: number) => `₱${value.toFixed(2)}`;"

if old_peso in content:
    content = content.replace(old_peso, new_peso)
    print(f"✓ Fixed peso symbol encoding in formatPeso")
else:
    print(f"⚠ Peso symbol may already be correct")

file_path.write_text(content, encoding='utf-8')
print("File patched successfully")
