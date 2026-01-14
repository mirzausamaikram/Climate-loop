# Climate Loop Deployment Guide

## Quick Deploy to Vercel

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js
5. Click "Deploy"

### 3. Deploy via CLI
```bash
vercel
```

Follow the prompts to deploy.

### 4. Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_APP_URL`: Your Vercel URL
- `PYTHON_API_URL`: Your Python backend URL (see below)

## Deploy Python Backend

### Option 1: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select the `python` directory
4. Add environment variables:
   - `PORT`: 5000
5. Railway will auto-detect Flask and deploy

### Option 2: Heroku
```bash
cd python
heroku create climate-loop-scheduler
git subtree push --prefix python heroku main
```

### Option 3: Render
1. Go to [render.com](https://render.com)
2. New Web Service → Connect GitHub
3. Root Directory: `python`
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `gunicorn api:app`

## Connect Frontend to Backend

Update the API endpoint in your Next.js app:

```typescript
// src/lib/config.ts
export const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:5000'
```

## Custom Domain (Optional)

### In Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., climateloop.hk)
3. Follow DNS configuration instructions

## Production Checklist

- [ ] Deploy Next.js frontend to Vercel
- [ ] Deploy Python backend to Railway/Heroku
- [ ] Set environment variables
- [ ] Test API connections
- [ ] Configure custom domain (optional)
- [ ] Enable analytics (Vercel Analytics)
- [ ] Set up error monitoring (Sentry)
- [ ] Add meta tags for SEO
- [ ] Test on mobile devices

## Monitoring

### Vercel Analytics
Enable in Project Settings → Analytics

### Python API Monitoring
Add health check monitoring:
```bash
# UptimeRobot or similar
GET https://your-python-api.railway.app/health
```

## Costs

- **Vercel**: Free for hobby projects
- **Railway**: ~$5/month for Python service
- **Total**: ~$5/month

## Performance Optimization

- [x] Next.js static optimization
- [x] Image optimization (next/image)
- [x] API caching (revalidate)
- [x] Lazy loading 3D components
- [ ] CDN for assets
- [ ] Database caching (if added)

## Security

- [x] CORS configured
- [x] Environment variables for secrets
- [ ] Rate limiting (add if needed)
- [ ] Input validation
- [ ] HTTPS enforced

## Need Help?

Check deployment logs:
```bash
# Vercel
vercel logs

# Railway
railway logs

# Heroku
heroku logs --tail
```
