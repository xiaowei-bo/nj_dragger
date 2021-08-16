#### 1、前言
***
以深度学习为目的，我们来一起实现一个可视化配置平台(nocode)      
项目技术栈为： VueCli5 + ElementUI + Egg     
平台地址：[可视化配置平台](http://ixuexi.plus:9797/#/drag/list)    
h5页面：[可视化配置平台产出Demo页面](http://ixuexi.plus:9797/view?id=45)    
代码地址：[git仓库](https://github.com/killWeb/nj_dragger)     
#### 2、思路及架构图
***
![思路.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb5baabf1a87480eba8c6cf9a985f082~tplv-k3u1fbpfcp-watermark.image)
#### 3、效果图
***
![效果图.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17a5892b7c32403389cad99c87fd8095~tplv-k3u1fbpfcp-watermark.image)
#### 4、功能清单
***
- 组件展示区拖拽至画布区生成页面元素
- 画布内拖拽调整页面组件展示顺序
- 画布中组件选中态时，拖拽边角可快捷改变组件宽高
- 快捷键保存活动及复制、粘贴、删除组件
- 导入导出实时 JSON数据
- 画布可调整机型尺寸及缩放
- 组件样式自定义配置及实时预览
- 组件事件自定义配置，且支持执行js代码行为
- 组件进场动画配置及预览
#### 5、代码目录结构说明
***
```
|----.husky                                     - githook 代码提交前检测
|----public
    |----index.html                             - b端入口html
    |----view.html                              - h5入口html
|----server                                     - node服务
|----sh         
    |----build.sh                               - 构建脚本
    |----deploy.sh                              - 部署脚本
|----src
    |----api                                    - 接口管理
    |----components                             - b端公共组件
    |----config
        |----animate.js                         - 动画配置文件
        |----event.js                           - 时间配置文件
        |----json_scheme.js                     - 整体数据结构
        |----style.js                           - 样式配置文件
    |----directives                             - 公共指令
    |----plugins                                - 组件库
    |----router                                 - 路由管理
    |----store                                  - 公共状态管理
    |----style                                  - 公共样式
    |----utils                                  - 公共js方法
    |----views          
        |----drag                               - 可视化配置平台
            |----edit                           - 编辑器
                |----wrapper/Edit               - 画布区
                |----wrapper/Header             - 顶部操作区
                |----wrapper/LeftAside          - 页面及组件展示区
                |----wrapper/RightAside         - 组件及页面表单配置区
            |----list                           - 活动列表页
            |----h5                             - h5页面
        |----auto                               - 可视化构建部署
        |----doc                                - 文档
    |----App.vue                                - 入口vue实例
    |----main.js                                - 入口js文件
    |----permission.js                          - 路由守卫
|----vue.config.js                              - vue/cli配置
```
#### 6、
