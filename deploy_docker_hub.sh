#!/bin/sh
set -e

SERVICE_NAME=tester-sample-app
IMAGE="${DOCKER_USERNAME}/${SERVICE_NAME}"
GIT_VERSION=$(git describe --always --abbrew --tags --long)
IMAGE_WITH_TAG=${IMAGE}:${GIT_VERSION}

docker build -t ${IMAGE_WITH_TAG} .
docker tag ${IMAGE_WITH_TAG} ${IMAGE}:latest

echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
docker push ${IMAGE_WITH_TAG}
docker logout
