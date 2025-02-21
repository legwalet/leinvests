#!/bin/bash

# Make the script executable
chmod +x deploy.sh

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment process...${NC}"

# Run validation
echo -e "${BLUE}🔍 Running validation...${NC}"
if ! npm run validate; then
    echo -e "${RED}❌ Validation failed. Please fix the issues and try again.${NC}"
    exit 1
fi

# Build the project
echo -e "${BLUE}🏗️  Building project...${NC}"
if ! npm run build; then
    echo -e "${RED}❌ Build failed. Please fix the issues and try again.${NC}"
    exit 1
fi

# Deploy to Netlify
echo -e "${BLUE}📤 Deploying to Netlify...${NC}"
if ! netlify deploy --prod; then
    echo -e "${RED}❌ Deployment failed. Please check your Netlify configuration.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Deployment completed successfully!${NC}" 