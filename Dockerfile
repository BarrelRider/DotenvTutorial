FROM node:21-alpine3.17

WORKDIR /app

COPY . .

ENV API=https://rickandmortyapi.com/api

RUN npm install

EXPOSE 3000

CMD [ "node", "server.js" ]