#!/bin/bash

# ANRAK Virtual Try-On Deployment Script
echo "🚀 ANRAK Virtual Try-On Deployment Script"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Creating GitHub Repository${NC}"
echo "Please manually create a GitHub repository:"
echo "1. Go to https://github.com/new"
echo "2. Repository name: anrak-virtual-tryon-shopify-app"
echo "3. Description: Complete Shopify virtual try-on app with AI integration"
echo "4. Make it Public"
echo "5. Don't initialize with README (we already have one)"
echo ""
read -p "Press Enter when repository is created..."

echo -e "${YELLOW}Step 2: Adding GitHub Remote${NC}"
read -p "Enter your GitHub username: " github_username
git remote add origin https://github.com/${github_username}/anrak-virtual-tryon-shopify-app.git

echo -e "${YELLOW}Step 3: Pushing Code to GitHub${NC}"
git branch -M main
git push -u origin main

echo -e "${GREEN}✅ Code pushed to GitHub${NC}"

echo -e "${YELLOW}Step 4: Railway Deployment Setup${NC}"
echo "Next steps for Railway:"
echo "1. Go to https://railway.app"
echo "2. Sign up/Login with GitHub"
echo "3. Click 'New Project'"
echo "4. Select 'Deploy from GitHub repo'"
echo "5. Select: ${github_username}/anrak-virtual-tryon-shopify-app"
echo ""

echo -e "${YELLOW}Step 5: Database Setup${NC}"
echo "In Railway project:"
echo "1. Click 'New' → 'Database' → 'Add PostgreSQL'"
echo "2. Railway will auto-generate DATABASE_URL"
echo ""

echo -e "${YELLOW}Step 6: Environment Variables${NC}"
echo "Set these variables in Railway dashboard:"
echo ""
echo "SHOPIFY_API_KEY=your_api_key_here"
echo "SHOPIFY_API_SECRET=your_api_secret_here"
echo "HOST=https://your-railway-url.up.railway.app"
echo "SHOPIFY_APP_URL=https://your-railway-url.up.railway.app"
echo "SCOPES=write_products,read_products"
echo "SESSION_SECRET=$(openssl rand -base64 32)"
echo "N8N_WEBHOOK_URL=https://n8n.srv920226.hstgr.cloud/webhook/gemini-image-gen"
echo "NODE_ENV=production"
echo ""

echo -e "${YELLOW}Step 7: Shopify Partner Dashboard${NC}"
echo "1. Go to https://partners.shopify.com"
echo "2. Create new app with Railway URL"
echo "3. Set app proxy: /apps/anrak-try-on"
echo "4. Configure scopes: write_products,read_products"
echo ""

echo -e "${GREEN}🎉 Deployment guide completed!${NC}"
echo "Check DEPLOYMENT.md for detailed instructions."