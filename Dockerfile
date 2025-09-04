# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including dev for build)
RUN npm install

# Copy application files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Remove dev dependencies for production
RUN npm prune --omit=dev

# Expose port
EXPOSE $PORT

# Start command
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]