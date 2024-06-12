FROM node:16

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Install additional audio dependencies
RUN npm install @discordjs/opus

# Bundle app source
COPY . .

# Copy audio files
COPY audio/ /usr/src/app/audio/

# Set environment variables
ENV AUDIO_SETTINGS=high_quality

# Expose the port your bot listens on (if applicable)
EXPOSE 3000

# Run the bot
CMD ["node", "main.js"]