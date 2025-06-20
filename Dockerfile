# ---- Base Stage ----
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app source
COPY . .

# ---- Build Stage (for production) ----
FROM base AS build
RUN npm run build

# ---- Development Stage ----
FROM base AS dev
ENV NODE_ENV=development
EXPOSE 3000
# For development, you can override the CMD to run dev server
# Example: docker run -it --rm -p 3000:3000 -v ${PWD}:/app nextjs-f1gpt-dev npm run dev
CMD ["npm", "run", "dev"]

# ---- Production Stage ----
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary files from build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./next.config.ts
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/app ./app
COPY --from=build /app/scripts ./scripts

EXPOSE 3000

# Default to production start
CMD ["npm", "start"]

# ---
# To build for development:
#   docker build --target dev -t nextjs-f1gpt-dev .
#   docker run -it --rm -p 3000:3000 -v ${PWD}:/app nextjs-f1gpt-dev
#
# To build for production:
#   docker build --target prod -t nextjs-f1gpt-prod .
#   docker run -it --rm -p 3000:3000 nextjs-f1gpt-prod
