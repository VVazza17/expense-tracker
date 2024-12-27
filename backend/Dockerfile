# Use an official Node.js image from Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the remaining files into the container
COPY . .

# Expose port 5000 (the port your server is running on)
EXPOSE 5000

# Run the server when the container starts
CMD ["node", "server.js"]
