FROM node:18-alpine3.18

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app


RUN npm ci

COPY . /app

EXPOSE 8003

CMD ["npm", "start"]