#!/bin/bash
ssh -i deploy_rsa $SERVER_USERNAME@jankon.energy 'sudo docker service update --image jankonenergia/backend:latest jankonenergia_backend'
ssh -i deploy_rsa $SERVER_USERNAME@jankon.energy 'sudo docker service update --image jankonenergia/fronttend:latest jankonenergia_frontend'