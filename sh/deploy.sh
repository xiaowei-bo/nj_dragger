workDir=`pwd`

md5_old=`cat package.md5`
md5_new=`md5sum package.json |awk '{print $1}'`

if [ ! -d "$workDir/node_modules" ];
then
    echo "node_modules目录缺失，开始执行 npm i --production"
    npm i --production
    echo "$md5_new" > package.md5
elif [ "$md5_old" = "$md5_new" ];
then
    echo "package.json文件无更新，无需安装依赖"
else
    echo "md5_old=$md5_old,md5_new=$md5_new"
    echo "package.json文件有更新，开始执行 npm i --production"
    echo "$md5_new" > package.md5
    npm i --production
fi

echo "开始部署..."
npm run server:production
echo "部署完成>>>>>>>>>>>>>>>>>>"