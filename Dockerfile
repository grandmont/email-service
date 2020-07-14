# Build email-service
FROM node:12-alpine

WORKDIR /srv

COPY package.json yarn.lock ./

RUN yarn

COPY src ./src

EXPOSE 40000

CMD ["node", "src/index.js"]
