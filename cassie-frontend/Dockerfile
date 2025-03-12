FROM node:18-alpine

WORKDIR /app

# Add environment variables
ENV SKIP_PREFLIGHT_CHECK=true
ENV WATCHPACK_POLLING=true
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy package files
COPY package*.json ./

# Install dependencies including date-fns explicitly
RUN npm install && \
    npm install date-fns --save

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

CMD ["npm", "start", "--", "--host", "0.0.0.0"] 