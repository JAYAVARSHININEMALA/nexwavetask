# 🏗️ Pear Media - Architecture & System Design

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT SIDE (Browser)                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Pear Media Frontend (index.html)          │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                       │  │
│  │  ┌─────────────────────┐  ┌──────────────────────┐  │  │
│  │  │ Text Enhancement    │  │  Image Analysis &    │  │  │
│  │  │ Workflow            │  │  Variations          │  │  │
│  │  ├─────────────────────┤  ├──────────────────────┤  │  │
│  │  │ • Input text        │  │ • Upload image       │  │  │
│  │  │ • Display enhanced  │  │ • Display analysis   │  │  │
│  │  │ • Approve/reject    │  │ • Generate styles    │  │  │
│  │  │ • Generate images   │  │ • View variations    │  │  │
│  │  └─────────────────────┘  └──────────────────────┘  │  │
│  │                                                       │  │
│  │         ┌─────────────┐      ┌──────────────┐       │  │
│  │         │ Image Grid  │      │ Error Handler│       │  │
│  │         │ Display     │      │ & Loading UI │       │  │
│  │         └─────────────┘      └──────────────┘       │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                 FETCH API (JSON over HTTP)
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVER SIDE (Node.js)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│            Express.js Middleware Stack                      │
│  ┌────────────────────────────────────────────────────┐   │
│  │ • CORS Middleware (cross-origin requests)         │   │
│  │ • Body Parser (JSON up to 50MB)                   │   │
│  │ • Static File Server (public/)                    │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ /api/      │  │ /api/        │  │ /api/        │       │
│  │ enhance-   │  │ generate-    │  │ analyze-     │       │
│  │ text       │  │ images       │  │ image        │       │
│  │            │  │              │  │              │       │
│  │ OpenAI ◄―─┤  │ HuggingFace◄─┤  │ OpenAI ◄─────┤       │
│  │ GPT-3.5    │  │ Stable Diff. │  │ Vision       │       │
│  │            │  │              │  │              │       │
│  │ Input:     │  │ Input:       │  │ Input:       │       │
│  │ • text     │  │ • prompt     │  │ • image data │       │
│  │            │  │              │  │              │       │
│  │ Output:    │  │ Output:      │  │ Output:      │       │
│  │ • enhanced │  │ • base64 imgs│  │ • analysis   │       │
│  │   text     │  │ • metadata   │  │ • metadata   │       │
│  └────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │ /api/generate-variations  (Variations Pipeline)  │   │
│  │ Input: Original analysis                          │   │
│  │ • Iterate through 3+ styles                       │   │
│  │ • Call HuggingFace for each                       │   │
│  │ • Return multiple styled images                   │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Error Handling & Logging                           │   │
│  │ • Try-catch blocks on all routes                  │   │
│  │ • User-friendly error messages                    │   │
│  │ • Fallback responses                              │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                  External API Calls
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   ┌─────────┐        ┌──────────┐     ┌──────────┐
   │ OpenAI  │        │HuggingFace   │ │Stability │
   │ API     │        │Inference API │ │ AI API   │
   │         │        │              │ │(optional)│
   │ •GPT    │        │• Stable      │ │          │
   │ •Vision │        │  Diffusion   │ │•DreamStudio
   └─────────┘        │• ControlNet  │ │          │
                      └──────────────┘ └──────────┘
```

---

## Data Flow Diagrams

### 1. Text Enhancement Flow
```
User Input (Text)
       │
       ▼
┌─────────────────────────────────┐
│ POST /api/enhance-text          │
│ { text: "..." }                 │
└─────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Call OpenAI GPT-3.5-turbo       │
│ Prompt: "Enhance this text..."  │
└─────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Receive Enhanced Text           │
│ + Analysis Metadata             │
└─────────────────────────────────┘
       │
       ▼
User Reviews Enhancement
(Displays in UI)
       │
       ▼
┌─────────────────────────────────┐
│ User Approves                   │
│ Clicks: "Generate Images"       │
└─────────────────────────────────┘
       │
       ▼
   Start Image Generation
```

### 2. Image Generation Flow
```
Enhanced Prompt (User-Approved)
       │
       ▼
┌─────────────────────────────────┐
│ POST /api/generate-images       │
│ { prompt: "..." }               │
└─────────────────────────────────┘
       │
       ▼
┌──────────────────┬──────────────────┐
│                  │                  │
▼                  ▼                  ▼
Request #1    Request #2         Request #3
Base Prompt   Variation 1        Variation 2
│             │                  │
▼             ▼                  ▼
HF API Call   HF API Call       HF API Call
│             │                 │
▼             ▼                 ▼
Base64 Image  Image Data       Image Data
│             │                │
└─────────────┴────────────────┘
       │
       ▼
Combine Results
       │
       ▼
Send to Frontend
       │
       ▼
Display Image Gallery
```

### 3. Image Analysis Flow
```
User Uploads Image
       │
       ▼
┌──────────────────────────────────┐
│ Convert to Base64                │
│ (client-side)                    │
└──────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ POST /api/analyze-image          │
│ { imageData: "data:image/..." }  │
└──────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ Call OpenAI Vision API           │
│ "Analyze this image..."          │
└──────────────────────────────────┘
       │
       ▼
Receive Analysis Text
       │
       ▼
Display Analysis
+ Enable Variations Button
       │
       ▼
User Clicks: "Generate Variations"
       │
       ▼
POST /api/generate-variations
passing analysis as prompt
```

---

## Component Breakdown

### Frontend Components

| Component | Responsibility |
|-----------|-----------------|
| `Header` | Title and branding |
| `WorkflowCard` | Container for each workflow |
| `TextInputForm` | Text enhancement interface |
| `ImageUploadForm` | Image upload interface |
| `ResultsSection` | Enhanced text display |
| `AnalysisSection` | Image analysis display |
| `ImageGrid` | Gallery of generated images |
| `LoadingSpinner` | Visual feedback during requests |
| `ErrorMessage` | Error notifications |
| `StatusMessage` | Success/info messages |

### Backend Endpoints

| Endpoint | Method | Purpose | Input | Output |
|----------|--------|---------|-------|--------|
| `/api/enhance-text` | POST | Enhance text prompt | `{text}` | `{enhancedText, analysis}` |
| `/api/generate-images` | POST | Generate images | `{prompt}` | `{images}` |
| `/api/analyze-image` | POST | Analyze uploaded image | `{imageData}` | `{analysis}` |
| `/api/generate-variations` | POST | Generate style variations | `{analysis}` | `{variations}` |
| `/api/health` | GET | Server status check | - | `{status}` |
| `/` | GET | Serve frontend | - | HTML page |

---

## File Structure

```
pear-media/
│
├── public/
│   ├── index.html                 Frontend application
│   └── (assets would go here)
│
├── server/
│   └── server.js                  Express backend
│
├── Configuration Files
│   ├── package.json              Dependencies & scripts
│   ├── .env                      API keys (local)
│   ├── .env.example              API keys template
│   ├── .gitignore                Git ignore rules
│   ├── vercel.json               Vercel deployment
│   └── netlify.toml              Netlify deployment
│
├── Documentation
│   ├── README.md                 Main documentation
│   ├── DEPLOYMENT.md             Hosting guide
│   ├── API_SETUP.md              API key instructions
│   ├── DEMO_GUIDE.md             Demo video guide
│   ├── SUBMISSION.md             Submission checklist
│   └── ARCHITECTURE.md           This file
│
├── Scripts
│   ├── start.sh                  Unix start script
│   └── start.bat                 Windows start script
│
└── .git/                         Git repository
```

---

## Request/Response Examples

### Text Enhancement

**Request:**
```json
POST /api/enhance-text
{
  "text": "A magical forest"
}
```

**Response (Success):**
```json
{
  "originalText": "A magical forest",
  "enhancedText": "An enchanted forest with ancient trees, glowing mushrooms, and ethereal light filtering through the canopy",
  "analysis": {
    "tone": "descriptive",
    "intent": "image generation",
    "clarity": "improved"
  }
}
```

**Response (Error):**
```json
{
  "error": "OpenAI API error: Invalid API key"
}
```

### Image Generation

**Request:**
```json
POST /api/generate-images
{
  "prompt": "An enchanted forest with ancient trees, glowing mushrooms..."
}
```

**Response (Success):**
```json
{
  "images": [
    {
      "url": "data:image/png;base64,iVBORw0KGgoAAAANS...",
      "title": "Primary Generation"
    },
    {
      "url": "data:image/png;base64,iVBORw0KGgoAAAANS...",
      "title": "Artistic Variation"
    }
  ],
  "prompt": "An enchanted forest..."
}
```

---

## Technology Stack Details

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Animations
- **JavaScript (ES6+)**:
  - Fetch API for HTTP requests
  - FileReader for image upload
  - Base64 encoding for images
  - Async/await for async operations

### Backend
- **Node.js 14+**: Runtime environment
- **Express.js**: Web framework
- **CORS**: Cross-origin resource sharing
- **Multer**: File upload handling
- **dotenv**: Environment variables
- **node-fetch**: HTTP client

### External APIs
- **OpenAI**: GPT-3.5-turbo, Vision API
- **Hugging Face**: Stable Diffusion 2.1
- **Stability AI** (optional): Alternative image generation

---

## Performance Considerations

### Optimization Strategies

1. **Frontend**
   - Lazy loading of images
   - Base64 compression for images
   - Client-side form validation
   - Debouncing rapid requests

2. **Backend**
   - Request timeout handling
   - Error recovery mechanisms
   - Async/await for non-blocking I/O
   - CORS pre-flight optimization

3. **API Calls**
   - Reasonable timeout: 30 seconds
   - Retry logic for failures
   - Rate limiting awareness
   - Cost optimization

---

## Security Architecture

```
┌─────────────────────────────────────┐
│  Client (Browser)                   │
│  • No API keys stored                │
│  • Fetch to same-origin or CORS      │
└─────────────────────────────────────┘
           │
           │ HTTPS only
           │
┌─────────────────────────────────────┐
│  Server (Node.js)                   │
│  • API keys in server environment    │
│  • CORS configured for client origin │
│  • Request validation                │
│  • Error handling without exposing   │
└─────────────────────────────────────┘
           │
           │ HTTPS only
           │
┌──────────────────────────────────────┐
│  External APIs                        │
│  • Authenticated with API keys        │
│  • Rate limited per API               │
│  • Usage monitored                    │
└──────────────────────────────────────┘
```

---

## Deployment Architecture

### Vercel Deployment
```
GitHub Repository
       │
       ▼
Vercel Webhook
(auto on push)
       │
       ▼
Build Process
• npm install
• Verify ENV vars
       │
       ▼
Deploy to CDN
(global edge locations)
       │
       ▼
Live URL
https://pear-media.vercel.app
```

### Netlify Deployment
```
GitHub Repository
       │
       ▼
Netlify Webhook
(auto on push)
       │
       ▼
Build Process
• npm install
• Build if needed
       │
       ▼
Deploy to CDN
(edge nodes)
       │
       ▼
Live URL
https://pear-media.netlify.app
```

---

## Future Enhancements

### Short Term (v1.1)
- [ ] User authentication
- [ ] Save favorite prompts/images
- [ ] Export functionality (PNG, PDF)
- [ ] Advanced image editing

### Medium Term (v2.0)
- [ ] Database for user history
- [ ] API rate limiting per user
- [ ] Advanced caching system
- [ ] Real-time progress updates (WebSocket)

### Long Term (v3.0)
- [ ] Mobile app (React Native)
- [ ] Batch processing
- [ ] Custom model training
- [ ] Team collaboration
- [ ] Blog/portfolio features

---

## Monitoring & Observability

### Metrics to Track
- Request count and latency
- API error rates
- User engagement
- Cost per request
- Cache hit rates

### Logging
- Server logs (requests, errors)
- API call logs
- User action logs
- Performance metrics

### Alerts
- API downtime
- High error rates
- Uncommon request patterns
- Quota limits approached

---

## Known Limitations

1. **API Dependencies**
   - Relies on external services
   - Subject to API rate limits
   - Potential API changes
   - No offline mode

2. **Performance**
   - Image generation slow (~10-30 seconds)
   - API calls network-dependent
   - Large file uploads limited to 50MB

3. **Features**
   - Limited to predefined styles
   - Cannot fine-tune models
   - No real-time editing
   - Batch operations limited

---

*Last Updated: March 29, 2026*
