#!/bin/bash
echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
docker push jankonenergia/frontend
docker push jankonenergia/backend