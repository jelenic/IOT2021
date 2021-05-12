#get node image
FROM node:14-alpine
#RUN mkdir /src
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 4000

CMD ["node", "server.js"]