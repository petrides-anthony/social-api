FROM node:12.5.0
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
EXPOSE 3000