### STAGE 1: Build ###
FROM node:16-alpine as builder

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

RUN ls -la
RUN cat .env.production
RUN npm run build:prod

### STAGE 2: Setup ###
FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 3000
