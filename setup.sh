#!/bin/bash

# Make the script executable
chmod +x setup.sh

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting project setup...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${BLUE}📝 Creating .env file...${NC}"
    cp .env.example .env
fi

# Run type checking
echo -e "${BLUE}🔍 Running type check...${NC}"
npm run type-check

# Run linting
echo -e "${BLUE}🧹 Running linter...${NC}"
npm run lint

# Build the project
echo -e "${BLUE}🏗️  Building project...${NC}"
npm run build

echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo -e "${BLUE}To start the development server, run: npm run dev${NC}" 