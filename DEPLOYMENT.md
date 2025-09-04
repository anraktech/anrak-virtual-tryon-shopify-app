# ANRAK Virtual Try-On Deployment Guide

## Quick Setup Instructions

### 1. Railway Deployment

1. **Create Railway Account**: Go to [railway.app](https://railway.app) and sign up
2. **Create New Project**: Click "New Project" → "Deploy from GitHub repo"
3. **Connect Repository**: Connect this repository to Railway
4. **Add PostgreSQL Database**: 
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically set up the `DATABASE_URL` environment variable

### 2. Environment Variables

Set these in Railway's environment variables section:

```bash
# Required - Get from Shopify Partner Dashboard
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_SECRET=your_shopify_api_secret

# App Configuration
HOST=https://your-railway-app-url.up.railway.app
SHOPIFY_APP_URL=https://your-railway-app-url.up.railway.app
SCOPES=write_products,read_products

# Session Secret (generate a random string)
SESSION_SECRET=your_random_session_secret_here

# N8N Webhook (already configured)
N8N_WEBHOOK_URL=https://n8n.srv920226.hstgr.cloud/webhook/gemini-image-gen

# Database (automatically set by Railway PostgreSQL)
DATABASE_URL=postgresql://... (automatically provided)

# Node Environment
NODE_ENV=production
```

### 3. Shopify Partner Dashboard Setup

1. **Go to Shopify Partner Dashboard**: https://partners.shopify.com
2. **Create New App**:
   - App name: "ANRAK Virtual Try-On"
   - App URL: `https://your-railway-app-url.up.railway.app`
   - Allowed redirection URLs:
     - `https://your-railway-app-url.up.railway.app/auth/callback`
     - `https://your-railway-app-url.up.railway.app/api/auth/callback`

3. **Configure App Proxy**:
   - Subpath prefix: `apps`
   - Subpath: `anrak-try-on`  
   - Proxy URL: `https://your-railway-app-url.up.railway.app`

4. **Set Scopes**: `write_products,read_products`

5. **Get API Credentials**: Copy API key and secret to Railway environment variables

### 4. Deploy and Test

1. **Push to main branch** - Railway will automatically deploy
2. **Check deployment logs** in Railway dashboard
3. **Verify database migration** runs successfully
4. **Install app** on test store: https://tryitonbyanrak.myshopify.com (password: eaveum)

### 5. Theme Extension Installation

After app installation:

1. Go to your Shopify admin → Online Store → Themes
2. Find your active theme → Actions → Edit code
3. The extension should appear automatically
4. Add the "AI Try-On Button" block to product pages

## Testing the Integration

1. **Visit a product page** with the extension installed
2. **Click "AI TRY IT ON"** button
3. **Upload a photo** or use camera
4. **Verify webhook call** to N8N endpoint
5. **Check database** for TryOnStats entries

## Troubleshooting

### Common Issues:

1. **App won't load**: Check SHOPIFY_API_KEY and SHOPIFY_API_SECRET
2. **Database errors**: Ensure PostgreSQL is connected and migrations ran
3. **Webhook failing**: Verify N8N endpoint is accessible
4. **Theme extension missing**: Ensure app is installed and extension is added

### Logs:
- Railway deployment logs: Railway dashboard → Deployments
- App logs: Railway dashboard → Logs
- Shopify app logs: Partner dashboard → App → Monitoring

## Files Structure

```
anrak-virtual-tryon/
├── app/                           # Remix app files
│   ├── routes/
│   │   ├── _index.tsx            # Main app page
│   │   ├── apps.anrak-try-on.webhook.tsx  # Webhook proxy
│   │   └── auth.$.tsx            # Shopify auth
│   ├── models/                   # Database models
│   └── shopify.server.ts         # Shopify config
├── extensions/                   # Theme extension
│   └── anrak-try-on-theme-extension/
│       ├── blocks/
│       │   └── ai-try-on-button.liquid    # Main extension file
│       └── assets/
│           ├── anrak-try-on.js            # Frontend JS
│           └── anrak-try-on.css           # Styles
├── prisma/
│   └── schema.prisma            # Database schema
├── railway.toml                 # Railway config
├── Dockerfile                   # Container config
└── package.json                # Dependencies
```

## Success Indicators

✅ Railway app deploys successfully  
✅ Database migrations run without errors  
✅ Shopify app installs on test store  
✅ Theme extension appears in theme editor  
✅ "AI TRY IT ON" button shows on product pages  
✅ Modal opens when button clicked  
✅ Photo upload/camera capture works  
✅ Webhook receives requests (check N8N logs)  
✅ Database records TryOnStats entries  

## Next Steps

Once deployed and working:

1. **Test with multiple products** 
2. **Verify error handling**
3. **Check mobile responsiveness**
4. **Monitor webhook performance**
5. **Add proper API key management**
6. **Set up monitoring and alerts**

## Support

For issues:
1. Check Railway deployment logs
2. Verify environment variables
3. Test N8N webhook manually
4. Check Shopify app installation
5. Verify theme extension is active