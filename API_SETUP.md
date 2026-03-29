# 🔑 API Setup Instructions

Complete step-by-step guide to obtain free API keys for Pear Media.

## Total Time Required: ~15 minutes

---

## 1. OpenAI API Key (for Text Enhancement)

### Step 1: Create OpenAI Account
1. Go to: https://platform.openai.com/signup
2. Click "Sign up"
3. Enter email: **pearmedia@gmail.com**
4. Create password
5. Verify email

### Step 2: Get API Key
1. Go to: https://platform.openai.com/api-keys
2. Click "+ Create new secret key"
3. Name it: "Pear Media"
4. Copy the key (appears once!)
5. Save in secure location

### Step 3: Add to .env
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxx
```

### Step 4: Verify
- Balance shows: https://platform.openai.com/account/billing/overview
- Start with ~$5 free trial credits
- First request will test the connection

**Cost**: ~$0.001 per text enhancement request

---

## 2. Hugging Face API Key (for Image Generation)

### Step 1: Create Hugging Face Account
1. Go to: https://huggingface.co/join
2. Click "Join"
3. Work or Personal (choose one)
4. Enter email: **pearmedia@gmail.com**
5. Create password
6. Verify email

### Step 2: Get API Token
1. Go to: https://huggingface.co/settings/tokens
2. Click "New token"
3. Name: "Pear Media"
4. Role: Select "Read"
5. Click "Generate token"
6. Copy the token

### Step 3: Add to .env
```
HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxx
```

### Step 4: Test Model Access
1. Go to: https://huggingface.co/stabilityai/stable-diffusion-2-1
2. Click "Use model"
3. Accept terms if needed
4. You now have access to the Stable Diffusion model

**Cost**: Free tier available (unlimited community access)

---

## 3. Stability AI API Key (Optional)

### Step 1: Create Stability AI Account
1. Go to: https://stability.ai/signup
2. Fill in details
3. Verify email

### Step 2: Get API Key
1. Go to: Dashboard
2. API Keys section
3. Create new key
4. Copy it

### Step 3: Add to .env (Optional)
```
STABILITY_API_KEY=sk_xxxxxxxxxxxxx
```

**Cost**: Free trial ($5-10 credit), then usage-based

---

## Complete .env File

After collecting all keys, your `.env` should look like:

```env
# Required
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxx

# Optional
STABILITY_API_KEY=sk_xxxxxxxxxxxxx

# Server
PORT=3000
NODE_ENV=development
```

---

## Verification Checklist

- [ ] OpenAI account created
- [ ] OpenAI API key obtained
- [ ] Hugging Face account created
- [ ] Hugging Face API token obtained
- [ ] `.env` file created
- [ ] All keys added to `.env`
- [ ] `.env` is in `.gitignore` (don't commit!)
- [ ] Server starts without errors: `npm start`
- [ ] Frontend loads: http://localhost:3000

---

## API Quota & Limits

### OpenAI (Free Trial)
- **Credit**: $5-$20 free trial
- **Rate Limit**: 3 requests/minute
- **Cost/Request**: ~$0.001
- **Limit**: ~5000 requests before paid

### Hugging Face (Free)
- **Credit**: Unlimited
- **Rate Limit**: Depends on model
- **Cost/Request**: $0 (free)
- **Limit**: Community/free tier

### Stability AI (Free Trial)
- **Credit**: $5-$10
- **Rate Limit**: 10 requests/minute
- **Cost/Request**: $0.01-$0.05
- **Limit**: Till credits expire

---

## Troubleshooting API Setup

### "Invalid API Key"
- ✓ Copy entire key (no spaces)
- ✓ Use correct environment variable name
- ✓ Restart server after updating `.env`
- ✓ Check key hasn't expired

### "Rate limit exceeded"
- ✓ Wait a few seconds before retrying
- ✓ Upgrade to paid plan
- ✓ Upgrade API plan

### "Model not found"
- ✓ Ensure Hugging Face token has read access
- ✓ Accept model license terms on platform
- ✓ Check API endpoint in server.js

### "CORS error"
- ✓ This should not happen - backend handles it
- ✓ Verify `app.use(cors())` in server.js
- ✓ Check backend is running

---

## Security Best Practices

🔒 **NEVER**:
- ❌ Commit `.env` file to Git
- ❌ Share API keys on GitHub
- ❌ Post keys in forums/chat
- ❌ Use keys in client-side code

✅ **ALWAYS**:
- ✓ Keep `.env` in `.gitignore`
- ✓ Regenerate keys if exposed
- ✓ Use environment variables
- ✓ Monitor API usage for abuse

---

## Cost Estimate (6-hour demo)

| Service | Requests | Cost |
|---------|----------|------|
| OpenAI | 20 | $0.02 |
| Hugging Face | 50 | $0.00 |
| Stability AI | 0 | $0.00 |
| **Total** | 70 | **~$0.02** |

---

## Support

- **OpenAI**: https://help.openai.com/
- **Hugging Face**: https://huggingface.co/docs
- **Stability AI**: https://platform.stability.ai/docs

**Ready to demo?** You now have everything needed! 🚀
