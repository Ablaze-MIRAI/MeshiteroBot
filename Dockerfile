FROM node:16.16.0-alpine3.15

WORKDIR /usr/source

COPY . .

RUN yarn install

RUN yarn build

CMD ["node", "./dist/src/main.js"]