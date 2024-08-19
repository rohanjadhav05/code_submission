# Use an appropriate base image
FROM arm64v8/ubuntu:20.04

# Install the necessary packages for C++ development
RUN apt-get update && \
    apt-get install -y g++ && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /usr/src/app