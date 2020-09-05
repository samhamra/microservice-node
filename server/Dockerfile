FROM node:14.9.0-alpine
WORKDIR /service
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001




