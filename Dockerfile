FROM node:22-alpine

RUN apk add --no-cache python3 make g++

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm config set ignore-scripts false
RUN pnpm pkg set pnpm.onlyBuiltDependencies[]=better-sqlite3

RUN pnpm install

COPY . .

ENV DATABASE_URL="temp.db"

RUN pnpm build

EXPOSE 3000

CMD ["node", "build"]