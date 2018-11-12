#!/bin/bash

TAR="output.tar.gz"

export PATH=/home/fis/npm/bin:$PATH
cd management
yog2 release prod -cud ./output --fis3 --no-color

#复制webapp-base里的必要项目
cp ../webapp-base/package.json ./output
cp ../webapp-base/app.js ./output

#进入output目录
cd output

#将output目录进行打包
tar zcf $TAR ./*
mv $TAR ../../

cd ..
rm -rf output
cd ..
mkdir output
mv $TAR ./output/