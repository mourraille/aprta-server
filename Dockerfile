FROM node:13-alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY .pm2.config.js ./

RUN npm install

RUN npm install pm2 -g

RUN npm run build

COPY ./dist .

EXPOSE 4000

CMD ["pm2-runtime", "--json",".pm2.config.js"]