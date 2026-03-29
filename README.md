# 🎨 Pear Media - Text & Image Generation Platform

A powerful web application that integrates multiple AI APIs to enhance text prompts and generate creative images with variations.

## 🎯 Features

- **Text Enhancement Workflow**: Analyze and improve text prompts using OpenAI GPT
- **Image Generation**: Create high-quality images from enhanced prompts using Hugging Face Stable Diffusion
- **Image Analysis**: Analyze uploaded images to extract visual characteristics
- **Image Variations**: Generate artistic variations of analyzed images
- **Real-time Results**: Live processing with instant feedback
- **Beautiful UI**: Modern, responsive interface with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- API Keys (free tier available):
  - **OpenAI**: https://platform.openai.com/api-keys
  - **Hugging Face**: https://huggingface.co/settings/tokens

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pear-media.git
   cd pear-media
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Add your API keys to `.env`**
   ```
   OPENAI_API_KEY=your_key_here
   HUGGING_FACE_API_KEY=your_key_here
   PORT=3000
   ```

5. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:3000`

## 📋 API Integration

### Text Enhancement
- **Provider**: OpenAI GPT-3.5-turbo
- **Process**: Analyzes user text and generates improved prompts suitable for image generation
- **Cost**: ~$0.001 per request (minimal)

### Image Generation
- **Provider**: Hugging Face (Stable Diffusion 2.1)
- **Features**: 
  - High-quality image generation
  - Multiple variation styles
  - Customizable parameters
- **Cost**: Free tier available, unlimited requests

### Image Analysis
- **Provider**: OpenAI Vision (fallback supported)
- **Analyzes**: Objects, themes, styles, color palette, mood
- **Fallback**: Basic analysis if API unavailable

## 🔄 Workflow

### Text to Image Pipeline
1. User enters text prompt
2. System enhances prompt using AI
3. User reviews and approves enhanced text
4. System generates 2+ image variations
5. User views results and can regenerate

### Image Analysis Pipeline
1. User uploads or drag-drops image
2. System analyzes image content
3. System extracts visual characteristics
4. User can generate variations in different styles
5. View generated variations

## 📁 Project Structure

```
pear-media/
├── public/
│   └── index.html          # Frontend UI
├── server/
│   └── server.js           # Express backend
├── package.json            # Dependencies
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **APIs**:
  - OpenAI (Text Enhancement & Analysis)
  - Hugging Face (Image Generation)
- **Hosting**: Vercel/Netlify/GitHub Pages Ready

## 📊 API Usage Examples

### Text Enhancement
```javascript
POST /api/enhance-text
Content-Type: application/json

{
  "text": "A futuristic city"
}

Response:
{
  "originalText": "A futuristic city",
  "enhancedText": "A sprawling futuristic metropolis with towering skyscrapers, flying vehicles, neon lights, bioluminescent plants, and holographic advertisements",
  "analysis": { ... }
}
```

### Image Generation
```javascript
POST /api/generate-images
Content-Type: application/json

{
  "prompt": "A sprawling futuristic metropolis..."
}

Response:
{
  "images": [
    { "url": "data:image/png;base64,...", "title": "Primary Generation" },
    { "url": "data:image/png;base64,...", "title": "Artistic Variation" }
  ]
}
```

### Image Analysis
```javascript
POST /api/analyze-image
Content-Type: application/json

{
  "imageData": "data:image/png;base64,..."
}

Response:
{
  "analysis": "Description of image contents...",
  "objects": [...],
  "theme": "...",
  "style": "..."
}
```

## 🌐 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
# Follow prompts and add environment variables
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect repo to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy

### Deploy to GitHub Pages (Frontend only)
1. Build frontend assets
2. Push to `gh-pages` branch
3. Enable Pages in repository settings

## 🔐 Security

- API keys stored in `.env` (never commit)
- CORS enabled for cross-origin requests
- Request validation on all endpoints
- Error handling without exposing internals

## 📈 Monitoring & Logging

- Server logs request activity
- Error tracking for failed API calls
- Client-side error messages for user feedback

## 🐛 Troubleshooting

### "Cannot connect to server"
- Ensure server is running: `npm start`
- Check PORT is not already in use
- Verify `http://localhost:3000` is accessible

### "API Key Error"
- Verify `.env` file exists and has correct keys
- Check API keys are valid and not expired
- Ensure APIs are enabled in respective dashboards

### "Image generation fails"
- Check Hugging Face API quota
- Verify internet connection
- Try with simpler prompt

### "Rate limiting"
- Free tier has usage limits
- Upgrade to paid tier for higher limits
- Implement queue system for multiple requests

## 💡 Tips & Tricks

1. **Better prompts** → Better images
   - Use descriptive adjectives
   - Specify style (oil painting, photograph, 3D render)
   - Include mood/lighting details

2. **Image variations** → Diverse results
   - Try different artistic styles
   - Ask for different perspectives
   - Combine unrelated concepts

3. **Cost optimization**
   - Use free tier APIs
   - Batch requests when possible
   - Cache results for similar prompts

## 📝 License

MIT License - feel free to use and modify

## 👥 Support

For issues, questions, or suggestions:
- Open a GitHub issue
- Check existing documentation
- Review API provider docs

## 🎓 Learning Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Hugging Face Guide](https://huggingface.co/docs)
- [Express.js Tutorial](https://expressjs.com/)
- [Prompt Engineering Tips](https://platform.openai.com/docs/guides/prompt-engineering)

---

**Built with ❤️ by Pear Media**

*Last Updated: March 29, 2026*
