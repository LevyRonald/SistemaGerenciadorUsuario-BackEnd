FROM node:16-alpine

USER root

WORKDIR /home/node/app

COPY . .

EXPOSE 3000