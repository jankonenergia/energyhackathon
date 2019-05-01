#!/bin/bash

ssh -i deploy_rsa $SERVER_USERNAME@jankon.energy 'sudo docker pull jankonenergia/frontend:latest'
ssh -i deploy_rsa $SERVER_USERNAME@jankon.energy 'sudo docker pull jankonenergia/backend:latest'
ssh -i deploy_rsa $SERVER_USERNAME@jankon.energy 'sudo docker service update --env-add "VERSION=$TRAVIS_BUILD_NUMBER" --env-add "COMMIT=$TRAVIS_COMMIT" --env-add "COMMIT_MESSAGE=$TRAVIS_COMMIT_MESSAGE" --image jankonenergia/backend:latest jankonenergia_backend'
ssh -i deploy_rsa $SERVER_USERNAME@jankon.energy 'sudo docker service update --env-add "VERSION=$TRAVIS_BUILD_NUMBER" --env-add "COMMIT=$TRAVIS_COMMIT" --env-add "COMMIT_MESSAGE=$TRAVIS_COMMIT_MESSAGE" --image jankonenergia/frontend:latest jankonenergia_frontend'