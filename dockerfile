# Use an Electron base image that is compatible with multiple architectures
FROM electronuserland/builder:wine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your source code
COPY . .

# Build the Electron app
RUN npm run build:linux

# Copy the built AppImage to a known location
RUN mkdir /output
RUN cp dist/*.AppImage /output/
