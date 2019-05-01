#!/bin/bash

echo "***********[ Pulling latest images ]***********"
ssh $SERVER_USERNAME@jankon.energy 'sudo docker pull jankonenergia/frontend:latest'
ssh $SERVER_USERNAME@jankon.energy 'sudo docker pull jankonenergia/backend:latest'
echo "***********[ Updating images]***********"
BACKEND="sudo docker service update --env-add VERSION='$TRAVIS_BUILD_NUMBER' --env-add COMMIT='$TRAVIS_COMMIT' --env-add COMMIT_MESSAGE='$TRAVIS_COMMIT_MESSAGE' --image jankonenergia/backend:latest jankonenergia_backend"
FRONTEND="sudo docker service update --env-add VERSION='$TRAVIS_BUILD_NUMBER' --env-add COMMIT='$TRAVIS_COMMIT' --env-add COMMIT_MESSAGE='$TRAVIS_COMMIT_MESSAGE' --image jankonenergia/frontend:latest jankonenergia_frontend"
echo $BACKEND
ssh $SERVER_USERNAME@jankon.energy $FRONTEND
ssh $SERVER_USERNAME@jankon.energy $BACKEND