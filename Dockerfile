FROM node:18-alpine as build-stage
WORKDIR /usr/src/app
COPY /package*.json ./
COPY /src ./src
COPY /prisma ./prisma
COPY /tsconfig.json ./tsconfig.json
RUN npm ci
RUN npm run build
RUN npm ci --only=production

FROM node:18-alpine as prod
COPY --from=build-stage /usr/src/app/node_modules/ ./node_modules
COPY --from=build-stage /usr/src/app/dist/ ./dist
EXPOSE 3000

CMD ["node", "dist/main.js"]