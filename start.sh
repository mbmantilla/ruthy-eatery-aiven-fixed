#!/bin/bash

echo "================================"
echo "Ruthy Eatery - Complete Setup"
echo "================================"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install

# Build React
echo ""
echo "Building React app..."
npm run build

# Start server
echo ""
echo "Starting server on http://localhost:3001"
echo "Press Ctrl+C to stop"
echo ""

node server.js
