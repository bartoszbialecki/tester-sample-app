#!/bin/sh
set -e

SERVICE_NAME=tester-sample-app
IMAGE="${DOCKER_USERNAME}/${SERVICE_NAME}"
GIT_VERSION=$(git describe --always --abbrev --tags --long)
IMAGE_WITH_TAG=${IMAGE}:${GIT_VERSION}

docker build -t ${IMAGE_WITH_TAG} .
docker tag ${IMAGE_WITH_TAG} ${IMAGE}:latest

echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
docker push ${IMAGE_WITH_TAG}
docker logout

echo "${GITLAB_PASSWORD}" | docker login -u "${GITLAB_USERNAME}" --password-stdin registry.gitlab.com
docker build -t registry.gitlab.com/${GITLAB_USERNAME}/${SERVICE_NAME} .
docker push registry.gitlab.com/${GITLAB_USERNAME}/${SERVICE_NAME}
