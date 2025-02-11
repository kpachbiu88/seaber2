FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

FROM build AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --omit=dev

COPY --from=build /app/build ./build

CMD ["node", "build/index.js"]