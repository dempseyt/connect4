FROM node:20.15-alpine  
RUN npm install -g pnpm
WORKDIR /app
COPY --chown=node:node package.json . 
RUN pnpm install
COPY . .
RUN pnpm run build
CMD ["node", "src/connect-4-server/server.js"]