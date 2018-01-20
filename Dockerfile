FROM node:alpine

WORKDIR /app

COPY package.json /app
RUN npm install --production
CMD npm run build
COPY . /app

EXPOSE 8080

CMD npm run serve
