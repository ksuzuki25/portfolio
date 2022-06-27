FROM node:gallium-slim

USER root

# install base package
RUN echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list
RUN apt-get update \
    && apt-get install -y \
    init \
    openjdk-11-jdk \
    git \
    && apt-get -y clean \
    && rm -rf /var/lib/apt/lists/*
