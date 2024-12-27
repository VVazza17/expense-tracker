# Use an official Node.js image for building the React app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the remaining files
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Nginx image to serve the built app
FROM nginx:alpine

# Copy the build folder from the previous step into Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (the port Nginx serves on)
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
