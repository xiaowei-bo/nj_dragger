workDir=`pwd`
diffInfo=`git diff --name-only HEAD^`

if [ ! -d "$workDir/node_modules" ];
then
    echo "node_modules目录缺失，开始安装依赖"
    npm i --production
elif [[ $diffInfo =~ "package.json" ]];
then
    echo "package.json文件有变动，开始安装依赖"
    npm i --production
else
    echo "package.json文件无变动，无需安装依赖"
fi

echo "开始部署..."
npm run server:production