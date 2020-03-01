FROM node

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run compile

EXPOSE 3030
CMD ["node", "lib/"]