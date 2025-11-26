# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY app/package*.json ./

# Install dependencies
RUN npm install && npm cache clean --force

# Copy source code
COPY app/ .

# Build the React application
RUN npm run build

# Production stage
FROM nginx:1.27-alpine

# Add labels for image metadata
LABEL maintainer="nusbru"
LABEL description="Portuguese Residence Card Countdown Application"
LABEL version="1.0.0"

# Create non-root user for security
RUN addgroup -g 101 -S nginx || true \
    && adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx || true

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run/nginx.pid

# Expose port 80
EXPOSE 80

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
