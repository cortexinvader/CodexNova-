# Knight Bot MD - WhatsApp Bot

## Overview
Knight Bot is a WhatsApp multi-device bot built using the Baileys library. It provides various features for managing groups and automating tasks on WhatsApp.

## Project Structure
- `index.js` - Main entry point, handles WhatsApp connection and Express server
- `main.js` - Message handling and command routing
- `config.js` - API configurations and keys
- `settings.js` - Bot configuration (owner number, bot name, etc.)
- `commands/` - Individual command handlers (80+ commands)
- `lib/` - Utility functions and helpers
- `data/` - JSON files for persistent data storage
- `assets/` - Static assets like stickers and images
- `session/` - WhatsApp session credentials (created after pairing)

## Setup & Configuration
1. **Phone Number Pairing**: On first run, enter your WhatsApp number to receive a pairing code
2. **Owner Settings**: Edit `settings.js` to set your owner number and bot preferences
3. **Session**: The session folder stores authentication credentials

## Running the Bot
Command: `node index.js`

### Replit
- Express server runs on port 3000 with console output
- Bot connects to WhatsApp using multi-device protocol

### Render Deployment
1. Add environment variable `PORT` (Render will set this automatically)
2. Set `NODE_ENV=production` if needed
3. The bot will:
   - Listen on 0.0.0.0 (all network interfaces)
   - Use ownerNumber from settings.js for non-interactive mode
   - Provide health check endpoints at `/health` and `/ready`

## Dependencies
- Node.js 20+
- ffmpeg (for media processing)
- @whiskeysockets/baileys (WhatsApp library)
- express (health check server)

## Key Configuration Files
- `settings.js` - Set `ownerNumber` for Render (pairing won't be interactive)
- `.env` - Optional environment variables for Render deployment
