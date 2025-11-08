# AI-Powered Chatbot Setup Guide

## Overview
The Medagg chatbot has been upgraded to use xAI's Grok for intelligent, context-aware medical conversations.

## Setup Instructions

### 1. Get xAI Grok API Key
1. Visit [xAI Developer Portal](https://x.ai/api)
2. Create an account or sign in
3. Generate a new API key
4. Copy the API key

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your xAI Grok API key to `.env`:
   ```
   VITE_GROK_API_KEY=your-grok-api-key-here
   ```

### 3. Install Dependencies (if needed)
The chatbot uses existing React dependencies, no additional packages required.

## Features Implemented

### AI-Powered Responses
- **Natural Language Processing**: Understands medical queries in conversational language
- **Context Awareness**: Remembers conversation history for better responses
- **Medical Specialization**: Trained on Medagg's services and treatments

### Medical Safety Protocols
- **Emergency Detection**: Automatically detects medical emergencies
- **Safety Disclaimers**: Includes appropriate medical disclaimers
- **Professional Boundaries**: Never provides diagnosis, only general information

### Intelligent Features
- **Symptom Analysis**: Understands and categorizes patient symptoms
- **Treatment Recommendations**: Suggests appropriate Medagg services
- **Appointment Routing**: Intelligently routes to booking based on conversation

### Enhanced User Experience
- **Smart Quick Responses**: AI-powered quick response buttons
- **Conversation Memory**: Maintains context throughout the chat
- **Loading Indicators**: Shows "AI thinking..." during processing

## Medagg Services Integration

The AI is trained on all Medagg treatments:
- **PAE** (Prostatic Artery Embolization) - Enlarged prostate
- **GAE** (Genicular Artery Embolization) - Knee pain/arthritis
- **Thyroid Nodule Ablation** - Thyroid conditions
- **Breast Nodule VAE** - Breast lumps
- **Endovascular Coiling** - Aneurysms
- **Radiofrequency Ablation** - AVM treatment
- **Cryoablation** - Various conditions
- **CTO Treatment** - Chronic Total Occlusion

## Usage Examples

### Patient Conversations
- "I have knee pain that's getting worse"
- "I found a lump in my breast, what should I do?"
- "Tell me about non-surgical options for enlarged prostate"
- "Can you help me book an appointment?"

### AI Responses Include:
- Empathetic acknowledgment of concerns
- Relevant questions about symptoms
- Information about appropriate treatments
- Clear next steps and appointment booking

## Cost Considerations
- **API Costs**: ~$0.03 per 1,000 tokens
- **Average Conversation**: 2,000-5,000 tokens ($0.06-$0.15)
- **Monthly Estimate**: $50-200 for moderate usage

## Fallback System
If xAI Grok API fails:
- Automatic fallback to error message
- Provides phone contact information
- Maintains user experience

## Security & Privacy
- API keys stored in environment variables
- No conversation data stored permanently
- HIPAA-compliant conversation handling
- Emergency protocols for safety

## Testing the Integration
1. Start the development server
2. Open the chatbot
3. Try these test queries:
   - "Hello, I have knee pain"
   - "What treatments do you offer?"
   - "I need to book an appointment"
   - "Tell me about PAE treatment"

## Troubleshooting

### Common Issues:
1. **API Key Error**: Ensure `VITE_GROK_API_KEY` is set correctly
2. **Network Issues**: Check internet connection and API status
3. **Rate Limits**: Grok has usage limits for new accounts

### Error Messages:
- "Technical difficulties" = API connection issue
- Check browser console for detailed error logs

## Next Steps
The AI chatbot is now ready for production use with:
- Intelligent medical conversations
- Safe emergency handling
- Seamless appointment booking
- Professional medical assistance

Contact the development team for any configuration issues or additional customizations needed.
