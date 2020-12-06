FROM node:12

# создание директории приложения
WORKDIR /usr/src/app

# установка зависимостей
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]