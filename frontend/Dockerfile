FROM node:18.12.1

RUN npm install --force -g yarn
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install

COPY ./ ./

EXPOSE 5173
