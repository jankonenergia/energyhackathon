#!/bin/bash

echo "$TRAVIS_BUILD_NUMBER"
echo "$TRAVIS_COMMIT"
echo "$TRAVIS_COMMIT_MESSAGE"
ssh $SERVER_USERNAME@jankon.energy 'sudo docker pull jankonenergia/frontend:latest'
ssh $SERVER_USERNAME@jankon.energy 'sudo docker pull jankonenergia/backend:latest'
ssh $SERVER_USERNAME@jankon.energy 'sudo docker service update --env-add VERSION=$TRAVIS_BUILD_NUMBER --env-add COMMIT=$TRAVIS_COMMIT --env-add COMMIT_MESSAGE=$TRAVIS_COMMIT_MESSAGE --image jankonenergia/backend:latest jankonenergia_backend'
ssh $SERVER_USERNAME@jankon.energy 'sudo docker service update --env-add VERSION=$TRAVIS_BUILD_NUMBER --env-add COMMIT=$TRAVIS_COMMIT --env-add COMMIT_MESSAGE=$TRAVIS_COMMIT_MESSAGE --image jankonenergia/frontend:latest jankonenergia_frontend'