#!/bin/bash

rm -rf src/core

git clone git@github.com:techmmunity/core.git src/core

cd src/core

yarn --cwd src/core --production=true
