FROM node:14-alpine

ENV user userzoom
ENV workdir /usr/src/app/

RUN mkdir --parents $workdir
WORKDIR $workdir
COPY package.json $workdir
COPY package-lock.json $workdir

RUN npm install
COPY . $workdir