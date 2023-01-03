FROM node:16.13.0 AS builder
WORKDIR /dist
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci
COPY . .
#COPY .env-sample .env
RUN npm run build

FROM node:16.13-alpine
WORKDIR /dist
EXPOSE 4002
COPY --chown=node:node --from=builder /dist ./
USER node
CMD ["npm", "run", "start"]