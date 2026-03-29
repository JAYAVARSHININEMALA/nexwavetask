# 🚀 Deployment Guide - Pear Media

Complete step-by-step instructions for deploying Pear Media to production.

## Quick Deployment Options

### Option 1: Vercel (Recommended - 2 minutes)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd d:\NEXWAVE
vercel
```

#### Step 3: Configure Environment Variables
In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   - `OPENAI_API_KEY`
   - `HUGGING_FACE_API_KEY`
   - `STABILITY_API_KEY`
   - `NODE_ENV=production`

#### Step 4: Redeploy
```bash
vercel --prod
```

**Result**: Live URL from Vercel (e.g., `https://pear-media.vercel.app`)

---

### Option 2: Netlify (3-5 minutes)

#### Step 1: Connect GitHub Repository
1. Push code to GitHub: `git push origin main`
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select your GitHub repo

#### Step 2: Configure Build Settings
- Build command: `npm install && npm start`
- Publish directory: `public`

#### Step 3: Set Environment Variables
In Netlify Dashboard → Site settings → Build & deploy:
```
OPENAI_API_KEY = your_key
HUGGING_FACE_API_KEY = your_key
STABILITY_API_KEY = your_key
NODE_ENV = production
```

#### Step 4: Deploy
- Push to main branch
- Netlify auto-deploys

**Result**: Live URL from Netlify (e.g., `https://pear-media-prod.netlify.app`)

---

### Option 3: Heroku (Legacy, may require credit card)

#### Step 1: Install Heroku CLI
```bash
npm install -g heroku
```

#### Step 2: Login
```bash
heroku login
```

#### Step 3: Create App
```bash
cd d:\NEXWAVE
heroku create pear-media-prod
```

#### Step 4: Set Environment Variables
```bash
heroku config:set OPENAI_API_KEY=your_key
heroku config:set HUGGING_FACE_API_KEY=your_key
heroku config:set STABILITY_API_KEY=your_key
heroku config:set NODE_ENV=production
```

#### Step 5: Deploy
```bash
git push heroku main
```

---

### Option 4: GitHub Pages (Frontend Only)

#### Step 1: Build Static Frontend
```bash
# Copy public/index.html to docs/ folder in GitHub Pages
```

#### Step 2: Enable GitHub Pages
1. Go to Repository Settings
2. GitHub Pages → Source: `main` branch `/docs` folder

**Note**: API calls must go through CORS-enabled backend (use Option 1-3 for backend)

---

## Full Deployment Checklist

### Pre-Deployment
- [ ] All code committed: `git status` clean
- [ ] `.env` file in `.gitignore`
- [ ] No API keys in code
- [ ] `package.json` has all dependencies
- [ ] Tested locally: `npm start` works
- [ ] No console errors or warnings
- [ ] README.md complete and accurate

### Deployment
- [ ] Chosen hosting platform
- [ ] Environment variables set
- [ ] Deployment complete
- [ ] Live URL accessible
- [ ] Health check: `/api/health` returns status
- [ ] Frontend loads at root `/`

### Post-Deployment
- [ ] Test text enhancement workflow
- [ ] Test image generation workflow
- [ ] Test image analysis workflow
- [ ] Check error handling (test with no API key)
- [ ] Monitor for errors in dashboard
- [ ] Share deployed URL

### Performance Optimization
- [ ] Enable caching for static files
- [ ] Compress JavaScript/CSS
- [ ] Optimize images
- [ ] Set up CDN (if available)
- [ ] Monitor API response times

---

## Environment Variables Reference

```bash
# Required
OPENAI_API_KEY=sk-xxxxx                    # Get from https://platform.openai.com
HUGGING_FACE_API_KEY=hf_xxxxx              # Get from https://huggingface.co/settings/tokens

# Optional
STABILITY_API_KEY=sk-xxxxx                 # Get from https://stability.ai
PORT=3000                                   # Default: 3000
NODE_ENV=production                        # Set to 'production' for live

# For Database (future)
DATABASE_URL=                              # PostgreSQL URL if needed
```

---

## API Key Setup (Free Tier)

### 1. OpenAI API Key
1. Go to https://platform.openai.com/signup
2. Create account with Gmail (pearmedia@gmail.com)
3. Verify email
4. Go to API Keys: https://platform.openai.com/api-keys
5. Create new secret key
6. Copy and save securely

**Pricing**: ~$0.001 per text enhancement request

### 2. Hugging Face API Key
1. Go to https://huggingface.co/join
2. Create account
3. Go to Settings: https://huggingface.co/settings/tokens
4. Create new read token
5. Copy and save

**Pricing**: Free tier available, unlimited requests (community)

### 3. Stability AI (Optional)
1. Go to https://stability.ai/signup
2. Create account
3. Get API key from dashboard
4. Add to `.env`

**Pricing**: Free trial credits ($5-10), then usage-based

---

## Troubleshooting Deployment

### "Failed to deploy"
- Check all environment variables are set
- Verify `package.json` exists and is valid
- Check buildpack is Node.js
- Review deployment logs

### "Cannot find module"
- Run `npm install` before deploying
- Check `node_modules` not in `.gitignore` (it should be)
- Verify all dependencies in `package.json`

### "API Key errors after deploy"
- Environment variables not set correctly
- Use platform dashboard to verify
- Redeploy after setting variables
- Check variable names are exactly correct

### "Static files not serving"
- Ensure `public/index.html` exists
- Set correct publish directory
- Check Express is serving static files: `app.use(express.static(...))`

### "CORS errors"
- Backend must have CORS enabled: `app.use(cors())`
- Frontend must use correct API endpoint
- Check `API_BASE` in index.html matches backend URL

---

## Monitoring & Maintenance

### Logs
- **Vercel**: Dashboard → Functions → Logs
- **Netlify**: Dashboard → Functions → Logs
- **Heroku**: `heroku logs --tail`

### Alerts
- Set up notifications for errors
- Monitor API usage/costs
- Set billing limits on APIs

### Updates
- Keep dependencies updated: `npm update`
- Security patches: `npm audit fix`
- Node.js version: Upgrade when needed

---

## Rollback

### If deployment fails
```bash
# Revert to previous version
git revert HEAD
git push origin main
# Platform auto-redeploys
```

### Heroku rollback
```bash
heroku releases
heroku rollback v2  # Replace with previous version number
```

---

## Success Indicators

✅ Server responds to health check
✅ Frontend loads without errors
✅ API endpoints return proper responses
✅ No console errors
✅ Images load from API
✅ Text enhancement works
✅ Response times < 5 seconds
✅ Mobile responsive

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Express.js**: https://expressjs.com/
- **OpenAI**: https://platform.openai.com/docs
- **Hugging Face**: https://huggingface.co/docs

---

**Status**: Ready to deploy! 🚀
