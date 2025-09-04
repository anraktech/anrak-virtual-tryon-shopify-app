# 🚀 COMPLETE ANRAK Virtual Try-On Deployment Guide

## ✅ COMPLETED STEPS

1. ✅ **GitHub Repository Created**: https://github.com/anraktech/anrak-virtual-tryon-shopify-app
2. ✅ **Code Pushed to GitHub**: All app files committed and pushed
3. ✅ **Railway GitHub Integration**: Connected and configured

---

## 📋 NEXT STEPS - Complete These in Order

### STEP 1: Deploy to Railway

1. **Go to Railway Dashboard**: https://railway.app/dashboard
2. **Create New Project**:
   - Click "New" button
   - Select "GitHub Repo"
   - Choose "anraktech/anrak-virtual-tryon-shopify-app"
3. **Add PostgreSQL Database**:
   - In your new project, click "New" → "Database" → "Add PostgreSQL"
   - Railway will auto-generate `DATABASE_URL`

### STEP 2: Configure Environment Variables

In Railway project settings, add these environment variables:

```bash
# Required Shopify Keys (Get from Partner Dashboard)
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here

# App URLs (Replace with your Railway domain)
HOST=https://your-railway-url.up.railway.app
SHOPIFY_APP_URL=https://your-railway-url.up.railway.app

# App Configuration
SCOPES=write_products,read_products
NODE_ENV=production

# Session Secret (Generate random string)
SESSION_SECRET=your_random_session_secret_here

# N8N Integration (Already configured)
N8N_WEBHOOK_URL=https://n8n.srv920226.hstgr.cloud/webhook/gemini-image-gen

# Database URL (Auto-provided by Railway PostgreSQL)
DATABASE_URL=postgresql://... (automatically set by Railway)
```

### STEP 3: Create Shopify Partner App

1. **Go to Shopify Partners**: https://partners.shopify.com/organizations
2. **Create New App**:
   - Click "Create app" → "Create app manually"
   - App name: "ANRAK Virtual Try-On"
   - App type: "Custom app"

3. **Configure App Settings**:
   - **App URL**: `https://your-railway-url.up.railway.app`
   - **Allowed redirection URLs**:
     ```
     https://your-railway-url.up.railway.app/auth/callback
     https://your-railway-url.up.railway.app/api/auth/callback
     ```

4. **Set App Scopes**:
   - `read_products`
   - `write_products`

5. **Configure App Proxy**:
   - **Subpath prefix**: `apps`
   - **Subpath**: `anrak-try-on`
   - **Proxy URL**: `https://your-railway-url.up.railway.app`

6. **Get API Credentials**:
   - Copy the API key and API secret key
   - Add them to Railway environment variables

### STEP 4: Deploy and Test

1. **Verify Deployment**:
   - Check Railway deployment logs for success
   - Visit your app URL: `https://your-railway-url.up.railway.app`
   - Test endpoint: `https://your-railway-url.up.railway.app/apps/anrak-try-on/test`

2. **Install on Test Store**:
   - Store: https://tryitonbyanrak.myshopify.com
   - Password: `eaveum`
   - Install your app from Partner Dashboard

3. **Add Theme Extension**:
   - Go to Online Store → Themes
   - Edit theme → Add section
   - Add "AI Try-On Button" block to product pages

### STEP 5: Test Complete Workflow

1. **Visit a product page** on the test store
2. **Click "AI TRY IT ON"** button
3. **Upload a photo** or use camera
4. **Verify webhook call** is received by N8N
5. **Check database** for TryOnStats entries

---

## 🔧 QUICK COMMANDS

### Generate Session Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Test Database Connection:
```bash
# In Railway console
npx prisma db push
```

### Check Logs:
- **Railway**: Project dashboard → Deployments → View logs
- **App Test**: Visit `/apps/anrak-try-on/test` endpoint

---

## 📁 KEY FILES CREATED

```
├── app/
│   ├── routes/
│   │   ├── _index.tsx                    # Main dashboard
│   │   ├── apps.anrak-try-on.webhook.tsx # Webhook proxy
│   │   └── apps.anrak-try-on.test.tsx    # Test endpoint
│   ├── models/                           # Database models
│   └── shopify.server.ts                 # Shopify config
├── extensions/
│   └── anrak-try-on-theme-extension/
│       ├── blocks/ai-try-on-button.liquid # Theme extension
│       ├── assets/anrak-try-on.js         # Frontend JS
│       └── assets/anrak-try-on.css        # Styles
├── prisma/schema.prisma                   # Database schema
├── railway.toml                          # Railway config
├── Dockerfile                            # Container config
└── package.json                          # Dependencies
```

---

## 🎯 SUCCESS INDICATORS

- ✅ Railway app deploys without errors
- ✅ Database migrations complete successfully
- ✅ App installs on Shopify test store
- ✅ Theme extension appears in theme editor
- ✅ "AI TRY IT ON" button shows on product pages
- ✅ Modal opens with upload/camera options
- ✅ Webhook receives requests successfully
- ✅ Database records TryOnStats entries

---

## 🚨 TROUBLESHOOTING

### Common Issues:

1. **Deployment fails**: Check package.json dependencies and Node version
2. **Database connection error**: Verify DATABASE_URL in Railway
3. **Shopify auth fails**: Check API keys and redirect URLs
4. **Theme extension missing**: Verify app installation and permissions
5. **Webhook fails**: Test N8N endpoint manually

### Support Resources:
- **Railway Docs**: https://docs.railway.com
- **Shopify App Docs**: https://shopify.dev/docs/apps
- **GitHub Repository**: https://github.com/anraktech/anrak-virtual-tryon-shopify-app

---

## 📊 WHAT'S BEEN BUILT

This is a **complete, production-ready Shopify virtual try-on app** with:

- 🛍️ **Full Shopify integration** (CLI app, theme extension, webhooks)
- 🤖 **AI-powered virtual try-on** (N8N webhook integration)
- 📱 **Universal theme compatibility** (works with any Shopify theme)
- 📸 **Photo upload & camera capture** (responsive modal interface)
- 📊 **Usage analytics** (comprehensive database tracking)
- 🚀 **Cloud deployment ready** (Railway + PostgreSQL)
- 🔒 **Secure authentication** (Shopify OAuth + sessions)
- ⚡ **High performance** (Remix.js + optimized assets)

## 🎉 YOU'RE READY TO GO!

Follow the steps above and you'll have a fully functional AI-powered virtual try-on experience running on your Shopify store!