FROM node:16.16.0-alpine3.15

COPY . .

RUN yarn install

RUN yarn build

CMD ["node", "dist/main.js"]