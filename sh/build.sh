workDir=`pwd`
diffInfo=`git diff --name-only HEAD^`

if [ ! -d "$workDir/node_modules" ];
then
    echo "node_modules目录缺失，开始安装依赖"
    npm i
elif [[ $diffInfo =~ "package.json" ]];
then
    echo "package.json文件有变动，开始安装依赖"
    npm i
else
    echo "package.json文件无变动，无需安装依赖"
fi

echo "开始构建..."
npm run build:production