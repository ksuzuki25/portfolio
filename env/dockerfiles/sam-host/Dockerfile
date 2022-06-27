FROM node:gallium-alpine3.15

USER root

# install base package
RUN apk update && \
    apk upgrade && \
    apk add bash && \
    apk add --no-cache --virtual \
    build-deps \
    build-base \
    python3 \
    python3-dev \
    py3-pip \
    gcc \
    g++ \
    curl \
    git

# install sam
RUN pip3 install --upgrade pip && \
    pip3 install awscli && \
    pip3 install aws-sam-cli
