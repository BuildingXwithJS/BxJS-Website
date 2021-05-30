# Install dependencies only when needed
FROM node:alpine

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Define workdir
WORKDIR /app

# Copy package.json with lock and install deps
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Set build-time env vars
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT https://graphql.bxjs.dev/v1/graphql

# Copy rest of the app and build
COPY . .
RUN npm run build

# Production image, copy all the files and run next
ENV NODE_ENV production

# create new group and user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
# use that new user
USER nextjs

# expose port 3000
EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]
