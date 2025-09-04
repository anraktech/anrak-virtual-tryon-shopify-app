# ANRAK Virtual Try-On Shopify App

A complete Shopify app that enables AI-powered virtual try-on experiences for customers using Remix.js and N8N webhook integration.

## Features

- 🛍️ **Shopify Integration**: Full Shopify CLI app with Remix.js framework
- 🤖 **AI Virtual Try-On**: Integration with N8N webhook for AI image generation
- 📱 **Theme Extension**: "AI TRY IT ON" button for any Shopify theme
- 📸 **Photo Upload**: File upload and camera capture functionality
- 📊 **Analytics**: Usage tracking and statistics
- 🚀 **Railway Deployment**: Ready for Railway hosting with PostgreSQL

## Tech Stack

- **Backend**: Remix.js v2, Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Frontend**: React, Vanilla JavaScript
- **Hosting**: Railway
- **Shopify**: CLI, Admin API, Theme Extensions
- **AI Integration**: N8N webhook at `https://n8n.srv920226.hstgr.cloud/webhook/gemini-image-gen`

## Database Schema

### Session Table
- Shopify session management

### Settings Table
- Shop-specific configuration
- OpenRouter API key storage
- Webhook URL configuration

### TryOnStats Table
- Usage tracking (shop, productId, status, errorReason, createdAt)
- Performance monitoring

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and configure:

```env
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SCOPES=write_products,read_products
HOST=https://your-app-url.up.railway.app
DATABASE_URL=postgresql://username:password@host:port/database
SESSION_SECRET=your_session_secret
N8N_WEBHOOK_URL=https://n8n.srv920226.hstgr.cloud/webhook/gemini-image-gen
```

### 2. Local Development

```bash
# Install dependencies
npm install

# Set up database
npm run db:push

# Start development server
npm run dev

# Start Shopify CLI development
npm run shopify:dev
```

### 3. Railway Deployment

1. Connect your GitHub repository to Railway
2. Add a PostgreSQL database service
3. Set environment variables in Railway dashboard
4. Deploy automatically on push to main branch

### 4. Shopify App Configuration

Update `shopify.app.toml` with your app details:

- Set your Railway URL as the application URL
- Configure app proxy: `/apps/anrak-try-on/*`
- Add required scopes and permissions

## App Architecture

### App Proxy Routes
- `/apps/anrak-try-on/webhook` - Main webhook endpoint that forwards to N8N

### Theme Extension
- Adds "AI TRY IT ON" button to product pages
- Modal interface for photo upload
- Camera capture functionality
- Loading states and error handling

### Webhook Flow
1. Customer uploads photo via theme extension
2. Request sent to `/apps/anrak-try-on/webhook`
3. App forwards request to N8N webhook
4. N8N processes image with AI
5. Result returned to customer via modal

## Key Files

```
├── app/
│   ├── routes/
│   │   ├── _index.tsx              # Main app dashboard
│   │   ├── apps.anrak-try-on.webhook.tsx  # Webhook proxy route
│   │   └── auth.$.tsx              # Shopify authentication
│   ├── models/                     # Database models
│   └── shopify.server.ts           # Shopify configuration
├── extensions/
│   └── anrak-try-on-theme-extension/
│       ├── blocks/
│       │   └── ai-try-on-button.liquid    # Theme extension
│       ├── assets/
│       │   ├── anrak-try-on.js            # Frontend JavaScript
│       │   └── anrak-try-on.css           # Styles
│       └── locales/                       # Translations
├── prisma/
│   └── schema.prisma               # Database schema
└── server.js                      # Express server
```

## Testing

1. Install the app on your development store
2. Add the theme extension to your theme
3. Visit a product page and click "AI TRY IT ON"
4. Upload a photo or use camera capture
5. Verify webhook is called and result is displayed

## Store Information

- **Development Store**: https://tryitonbyanrak.myshopify.com
- **Store Password**: eaveum
- **N8N Webhook**: https://n8n.srv920226.hstgr.cloud/webhook/gemini-image-gen

## Troubleshooting

### Common Issues

1. **Webhook not working**: Check N8N endpoint is accessible
2. **Camera not working**: Ensure HTTPS and proper permissions
3. **Database issues**: Verify PostgreSQL connection and run migrations
4. **Theme extension not showing**: Check app is installed and extension is added to theme

### Logs

- Check Railway deployment logs for server errors
- Use browser developer tools for frontend issues
- Monitor Shopify app logs via CLI: `shopify app logs`

## Contributing

1. Fork the repository
2. Create feature branch
3. Test thoroughly
4. Submit pull request

## License

MIT License - see LICENSE file for details