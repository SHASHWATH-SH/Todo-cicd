# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies with --legacy-peer-deps to bypass dependency conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of your application code
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the app
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
