FROM node:10.16.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon
RUN npm install

EXPOSE 6200
CMD [ "npm", "start" ]