FROM node:latest

# create folder and set it as workdir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy package files to cache deps install
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm ci --silent

# copy app itself
COPY . /usr/src/app

# run next.js build
RUN npm run build

EXPOSE 80

CMD ["npm", "start"]
