FROM node:14 AS BUILD
WORKDIR /app
COPY package*.json ./
RUN npm i
EXPOSE 3000
CMD ["npm", "run", "start"]