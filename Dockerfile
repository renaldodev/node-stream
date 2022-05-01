FROM node:17-slim

RUN apt-get update && apt-get install -y --no-install-recommends\
    git-all
WORKDIR /app

COPY package.json  package-lock.json /app/

RUN npm ci --silent