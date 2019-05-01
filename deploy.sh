#!/bin/bash

ssh -i deploy_rsa $SERVER_USERNAME@jankon.energy 'sudo docker pull jankonenergia/frontend:latest'
ssh -i deploy_rsa $SERVER_USERNAME@jankon.energy 'sudo docker pull jankonenergia/backend:latest'
ssh -i deploy_rsa $SERVER_USERNAME@jankon.energy 'sudo docker service update --image jankonenergia/backend:latest jankonenergia_backend'
ssh -i deploy_rsa $SERVER_USERNAME@jankon.energy 'sudo docker service update --image jankonenergia/frontend:latest jankonenergia_frontend'