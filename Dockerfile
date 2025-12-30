FROM node:18-slim

# Install system deps (ffmpeg, fonts and build tools)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    fonts-dejavu-core \
    libvips-dev \
    build-essential \
    python3 \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy dependency manifests first (better caching)
COPY package*.json ./

# Use legacy peer deps if your deps need it; change to `npm ci` if you prefer
RUN npm install --legacy-peer-deps

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
