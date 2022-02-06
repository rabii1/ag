# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:16.13-alpine as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY package*.json ./

# Install all the dependencies
RUN npm install -g @angular/cli


COPY . .

run npm install
# Generate the build of the application
RUN npm run build --prod


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginxinc/nginx-unprivileged

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/GMAO /usr/share/nginx/html

# Expose port 80
EXPOSE 8080

CMD ["nginx","-g","daemon off;"]
