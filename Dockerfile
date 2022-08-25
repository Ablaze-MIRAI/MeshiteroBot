FROM node:16.16.0-alpine3.15

COPY . .

RUN yarn install --production

RUN yarn build

ENTRYPOINT ["node", "dist/main.js"]