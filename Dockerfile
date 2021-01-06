FROM node:14.9.0-alpine
WORKDIR /service
COPY . .
RUN npm install pm2 -g && npm install
CMD node src/server.js



