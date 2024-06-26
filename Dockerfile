# Use the official Node.js image as the base image
FROM node:18

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Define the build arguments (used during build time)
# ARG PORT=4000
# ARG MONGODB_URI="mongodb://localhost:27017/gulf_ddr"
# ARG JWT_SECRET=""

# Set environment variables (available during runtime)
# ENV PORT=${PORT}
# ENV MONGODB_URI=${MONGODB_URI}
# ENV JWT_SECRET=${JWT_SECRET}
# ENV NODE_ENV=${NODE_ENV}

# Define the command to run the app
CMD ["npm", "start"]
