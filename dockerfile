FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
RUN npm install @kubernetes/client-node

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
