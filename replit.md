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
The bot runs on port 5000 with an Express health check server.

Command: `node index.js`

## Dependencies
- Node.js 20+
- ffmpeg (for media processing)
- @whiskeysockets/baileys (WhatsApp library)

## Environment
- Express server runs on port 5000 for health checks
- Bot connects to WhatsApp using multi-device protocol
