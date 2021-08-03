git pull
workDir=`pwd`

md5_old=`cat package.md5`
md5_new=`md5sum package.json | awk '{print $1}'`
echo "md5_old=$md5_old,md5_new=$md5_new"

if [ ! -d "$workDir/node_modules" ];
then
    echo "node_modules目录缺失，开始执行 npm i"
    npm i
elif [ "$md5_old" = "$md5_new" ];
then
    echo "package.json文件无更新，无需安装依赖"
else
    echo "package.json文件有更新，开始执行 npm i"
    npm i
fi

echo "开始构建..."
npm run build:production
echo "构建完成>>>>>>>>>>>>>>>>>>"