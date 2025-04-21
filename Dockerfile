# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy over the code for the app
COPY . .

# Install dependencies and build the app
RUN npm i
RUN npm run build

# Production stage
FROM nginx:1.27.4-alpine3.21-slim
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]