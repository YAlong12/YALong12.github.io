FROM alpine:latest

RUN apk add --update nodejs npm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"] 