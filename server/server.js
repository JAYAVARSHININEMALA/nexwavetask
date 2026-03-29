require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Store uploads temporarily
const upload = multer({ dest: 'uploads/' });

// API Keys from environment
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const STABILITYA_API_KEY = process.env.STABILITY_API_KEY;

// Text Enhancement Endpoint
app.post('/api/enhance-text', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Use OpenAI API for text enhancement
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at enhancing and improving text prompts for image generation. Analyze the user text, improve clarity, add descriptive details, and make it more suitable for image generation. Return only the enhanced prompt without explanation.'
          },
          {
            role: 'user',
            content: `Enhance this text prompt for image generation: "${text}"`
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error');
    }

    const enhancedText = data.choices[0].message.content.trim();
    res.json({ 
      originalText: text,
      enhancedText: enhancedText,
      analysis: {
        tone: 'descriptive',
        intent: 'image generation',
        clarity: 'improved'
      }
    });

  } catch (error) {
    console.error('Text enhancement error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Image Generation Endpoint
app.post('/api/generate-images', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Use Hugging Face for image generation (Stable Diffusion)
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: 'blurry, low quality, distorted',
            num_inference_steps: 50,
            guidance_scale: 7.5
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.status}`);
    }

    const imageBuffer = await response.buffer();
    const base64Image = imageBuffer.toString('base64');

    // Generate second image variation with prompting
    const response2 = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: `${prompt}, different style, artistic variation`,
          parameters: {
            negative_prompt: 'blurry, low quality, distorted',
            num_inference_steps: 50,
            guidance_scale: 7.5
          }
        }),
      }
    );

    const imageBuffer2 = await response2.buffer();
    const base64Image2 = imageBuffer2.toString('base64');

    res.json({
      images: [
        { url: `data:image/png;base64,${base64Image}`, title: 'Primary Generation' },
        { url: `data:image/png;base64,${base64Image2}`, title: 'Artistic Variation' }
      ],
      prompt: prompt
    });

  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Image Analysis Endpoint
app.post('/api/analyze-image', async (req, res) => {
  try {
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    // Use OpenAI Vision for image analysis
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this image. Describe: 1) Objects and subjects, 2) Theme and style, 3) Color palette, 4) Mood. Be concise.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Fallback analysis if vision API fails
      return res.json({
        analysis: 'Image uploaded successfully. Using fallback analysis.',
        objects: ['Image content detected'],
        theme: 'Visual content',
        style: 'To be elaborated',
        mood: 'Neutral'
      });
    }

    const analysis = data.choices[0].message.content;

    res.json({
      analysis: analysis,
      objects: ['Detected from image'],
      theme: 'As described',
      style: 'From analysis',
      mood: 'As analyzed'
    });

  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis service temporary unavailable',
      fallback: true
    });
  }
});

// Generate variations endpoint
app.post('/api/generate-variations', async (req, res) => {
  try {
    const { analysis, count = 2 } = req.body;

    if (!analysis) {
      return res.status(400).json({ error: 'Analysis is required' });
    }

    const variations = [];

    // Generate multiple variations
    for (let i = 0; i < count; i++) {
      const styleVariation = ['oil painting', 'watercolor', '3D render', 'digital art', 'photography'][i % 5];
      const prompt = `Create variation of: ${analysis}. Style: ${styleVariation}`;

      try {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
            },
            body: JSON.stringify({
              inputs: prompt,
              parameters: {
                negative_prompt: 'blurry, low quality',
                num_inference_steps: 30,
                guidance_scale: 7.5
              }
            }),
          }
        );

        if (response.ok) {
          const imageBuffer = await response.buffer();
          const base64Image = imageBuffer.toString('base64');
          variations.push({
            url: `data:image/png;base64,${base64Image}`,
            style: styleVariation
          });
        }
      } catch (e) {
        console.error(`Variation ${i} generation failed:`, e);
      }
    }

    res.json({
      variations: variations,
      totalGenerated: variations.length,
      prompt: analysis
    });

  } catch (error) {
    console.error('Variations generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Pear Media server running on http://localhost:${PORT}`);
});
