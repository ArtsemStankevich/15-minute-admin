FROM node:21.1.0
ENV DockerHOME=/home/app/15min/
WORKDIR $DockerHOME
COPY package*.json ./
RUN apk update && \ apk upgrade && \ apk add --no-cache git

RUN npm install -g react-scripts@5.0.1
RUN npm install
RUN git config --local core.hooksPath .githooks
COPY . $DockerHOME

RUN npm run build

EXPOSE 3000

# Uruchom serwer WWW
CMD [ "npm", "start" ]
