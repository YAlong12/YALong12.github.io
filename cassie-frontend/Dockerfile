FROM node:18-alpine

WORKDIR /app

# Add environment variables
ENV SKIP_PREFLIGHT_CHECK=true
ENV WATCHPACK_POLLING=true
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start", "--", "--host", "0.0.0.0"] 