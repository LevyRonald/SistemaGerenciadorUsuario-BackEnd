FROM node:16-alpine

USER root

WORKDIR /usr/app-nest/app

COPY . .

EXPOSE 3000