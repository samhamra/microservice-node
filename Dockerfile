FROM node:14.9.0-alpine
WORKDIR /usr/app/src
COPY --chown=node:node . .
RUN npm install pm2 -g && npm install
CMD node src/server.js



