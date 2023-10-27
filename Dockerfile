FROM node:lts-alpine
WORKDIR /usr/src/bot
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "discordbot.js" ]