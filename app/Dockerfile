FROM node:20-slim as build

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

COPY . /app/

ARG VITE_BACKEND_URL

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/ /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
