#!/bin/bash

# PRODUCTION
git checkout develop
git reset --hard
git pull origin develop

npm i yarn -g
yarn global add serve
yarn 
yarn run build
pm2 start "yarn run start:prod" --name=PORTFOLIO

# DEVELOPMENT
# npm i yarn -g
# yarn 
# pm2 start "yarn run start" --name=YOURSHOES-REACT
