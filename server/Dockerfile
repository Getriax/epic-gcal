FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . ./

RUN npm install typescript
RUN npm run build

CMD [ "npm", "start" ]
