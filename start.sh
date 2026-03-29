#!/bin/bash

# Pear Media - Quick Start Script for macOS/Linux

echo ""
echo "==================================================="
echo "◆ Pear Media - Text & Image Generation Platform ◆"
echo "==================================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "WARNING: .env file not found!"
    echo "Please copy .env.example to .env and add your API keys"
    echo ""
    echo "Learn how to get API keys in DEPLOYMENT.md"
    read -p "Press Enter to continue..."
fi

# Start the server
echo "Starting Pear Media server..."
echo "Open your browser to: http://localhost:3000"
echo ""
echo "Press CTRL+C to stop the server"
echo ""

npm start
