# Base stage: enable Corepack and install dependencies (including dev)
FROM node:18-alpine as base
WORKDIR /app

# Enable Corepack and prepare pnpm (this makes pnpm available)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package and lock files
COPY package.json pnpm-lock.yaml ./
# Install all dependencies (including dev dependencies)
RUN pnpm install

# Copy the rest of the code
COPY . .

# Production stage: install only production dependencies and build the app
FROM base as production
# Reinstall only production dependencies for a lean image
RUN pnpm install --prod
# Build your Next.js app
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "start"]

# Migration stage: keep dev dependencies so that drizzle-kit is available
FROM base as migration
# Run migrations and seeds using pnpm exec
CMD sh -c "pnpm db:push"
