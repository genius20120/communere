FROM node:14.17.3
WORKDIR /usr/src/app
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build

EXPOSE 5500

CMD [ "node", "dist/index" ]