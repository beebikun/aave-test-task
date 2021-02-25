FROM node:12 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
