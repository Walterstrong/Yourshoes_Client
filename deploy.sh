#!/bin/bash

# PRODUCTION
git checkout master
git reset --hard
git pull origin master

npm i yarn -g
yarn global add serve
yarn 
yarn run build
pm2 start "yarn run start:prod" --name=YOURSHOES-REACT

# DEVELOPMENT
# npm i yarn -g
# yarn 
# pm2 start "yarn run start" --name=YOURSHOES-REACT
