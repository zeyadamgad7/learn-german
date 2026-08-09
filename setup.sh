#!/bin/bash

echo "Starting project setup..."

# 1. Setup Backend
echo "Setting up Python backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# 2. Setup Frontend
echo "Setting up Node.js frontend..."
cd frontend
npm install
cd ..

echo "Setup complete! Check the README for how to start the servers."