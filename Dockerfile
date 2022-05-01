FROM node:17-slim

RUN apt-get update && apt-get install -y --no-install-recommends\
    git-all zsh fonts-powerline gpg gpg-agent gnupg socat
WORKDIR /app

COPY package.json  package-lock.json /app/

RUN npm ci --silent