FROM node:11
MAINTAINER JankonEnergia

COPY package.json /src/package.json
RUN cd /src && npm install --loglevel error
RUN apt-get update
COPY . /src
WORKDIR /src
EXPOSE 3000
CMD yarn start