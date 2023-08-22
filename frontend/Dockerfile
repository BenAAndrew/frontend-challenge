FROM node:18.4.0-alpine3.15

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./tsconfig.json ./
RUN npm i

COPY ./src ./src
COPY ./public ./public

CMD [ "npm", "run", "start" ]
