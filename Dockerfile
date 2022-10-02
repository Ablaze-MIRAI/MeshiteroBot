FROM node:16.16.0-alpine3.15

WORKDIR /usr/source

COPY . .

RUN yarn install --production

RUN yarn build

CMD ["node", "./dist/src/main.js"]