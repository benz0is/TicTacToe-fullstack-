FROM node:12-alpine as builder
WORKDIR /backup/server
COPY package.json .
RUN npm install
COPY . /backup/server
EXPOSE 5000
USER node
CMD ["node", "index.js"]
