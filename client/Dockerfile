
FROM node:current-slim


WORKDIR /backup/client


COPY package.json .


RUN npm install


EXPOSE 3000


CMD [ "npm", "start" ]


COPY . .
