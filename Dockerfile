# Production Dockerfile for SwadLipi on Render
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Environment configuration
ENV NODE_ENV=production
ENV PORT=10000

# Expose port
EXPOSE 10000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:10000/healthz || exit 1

# Start the application server and AI runtime
CMD ["node", "server.js"]
