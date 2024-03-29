FROM node:18-alpine

WORKDIR /frontend

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD yarn start