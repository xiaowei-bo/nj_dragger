workDir=`pwd`

md5_old=`cat package.md5`
md5_new=`md5sum package.json |awk '{print $1}'`

if [ ! -d "$workDir/node_modules" ];
then
    echo "node_modules目录缺失，开始执行 npm i --production"
    npm i --production
elif [ $md5_old != $md5_new ];
then
    echo "package.json文件有更新，开始执行 npm i --production"
    npm i --production
else
    echo "package.json文件无更新，无需安装依赖"
fi

echo "开始部署..."
npm run server:production
echo "部署完成>>>>>>>>>>>>>>>>>>"