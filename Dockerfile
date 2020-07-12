FROM node:13-alpine

WORKDIR /srv

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 40000

CMD ["yarn", "start"]