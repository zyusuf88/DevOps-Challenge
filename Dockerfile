# base image - node js version 18 as per task
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 80
CMD ["node", "index.js"]