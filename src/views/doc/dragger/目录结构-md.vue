<template>
<!-- eslint-disable -->
<div class="v-docs">
<div class="markdown-body"><h4>5、代码目录结构说明</h4>
<hr>
<pre class="hljs language" data-lang=""><code v-html="'|&lt;span class=&quot;hljs-params&quot;&gt;----&lt;/span&gt;&lt;span class=&quot;hljs-string&quot;&gt;.husky&lt;/span&gt;                                     - githook 代码提交前检测\n|&lt;span class=&quot;hljs-params&quot;&gt;----public&lt;/span&gt;\n    |&lt;span class=&quot;hljs-params&quot;&gt;----index&lt;/span&gt;.html                             - b端入口html\n    |&lt;span class=&quot;hljs-params&quot;&gt;----view&lt;/span&gt;.html                              - h5入口html\n|&lt;span class=&quot;hljs-params&quot;&gt;----server&lt;/span&gt;                                     - node服务\n|&lt;span class=&quot;hljs-params&quot;&gt;----sh&lt;/span&gt;         \n    |&lt;span class=&quot;hljs-params&quot;&gt;----build&lt;/span&gt;.sh                               - 构建脚本\n    |&lt;span class=&quot;hljs-params&quot;&gt;----deploy&lt;/span&gt;.sh                              - 部署脚本\n|&lt;span class=&quot;hljs-params&quot;&gt;----src&lt;/span&gt;\n    |&lt;span class=&quot;hljs-params&quot;&gt;----api&lt;/span&gt;                                    - 接口管理\n    |&lt;span class=&quot;hljs-params&quot;&gt;----components&lt;/span&gt;                             - b端公共组件\n    |&lt;span class=&quot;hljs-params&quot;&gt;----config&lt;/span&gt;\n        |&lt;span class=&quot;hljs-params&quot;&gt;----animate&lt;/span&gt;.js                         - 动画配置文件\n        |&lt;span class=&quot;hljs-params&quot;&gt;----event&lt;/span&gt;.js                           - 时间配置文件\n        |&lt;span class=&quot;hljs-params&quot;&gt;----json_scheme&lt;/span&gt;.js                     - 整体数据结构\n        |&lt;span class=&quot;hljs-params&quot;&gt;----style&lt;/span&gt;.js                           - 样式配置文件\n    |&lt;span class=&quot;hljs-params&quot;&gt;----directives&lt;/span&gt;                             - 公共指令\n    |&lt;span class=&quot;hljs-params&quot;&gt;----plugins&lt;/span&gt;                                - 组件库\n    |&lt;span class=&quot;hljs-params&quot;&gt;----router&lt;/span&gt;                                 - 路由管理\n    |&lt;span class=&quot;hljs-params&quot;&gt;----store&lt;/span&gt;                                  - 公共状态管理\n    |&lt;span class=&quot;hljs-params&quot;&gt;----style&lt;/span&gt;                                  - 公共样式\n    |&lt;span class=&quot;hljs-params&quot;&gt;----utils&lt;/span&gt;                                  - 公共js方法\n    |&lt;span class=&quot;hljs-params&quot;&gt;----views&lt;/span&gt;          \n        |&lt;span class=&quot;hljs-params&quot;&gt;----drag&lt;/span&gt;                               - 可视化配置平台\n            |&lt;span class=&quot;hljs-params&quot;&gt;----edit&lt;/span&gt;                           - 编辑器\n                |&lt;span class=&quot;hljs-params&quot;&gt;----wrapper/Edit&lt;/span&gt;               - 画布区\n                |&lt;span class=&quot;hljs-params&quot;&gt;----wrapper/Header&lt;/span&gt;             - 顶部操作区\n                |&lt;span class=&quot;hljs-params&quot;&gt;----wrapper/LeftAside&lt;/span&gt;          - 页面及组件展示区\n                |&lt;span class=&quot;hljs-params&quot;&gt;----wrapper/RightAside&lt;/span&gt;         - 组件及页面表单配置区\n            |&lt;span class=&quot;hljs-params&quot;&gt;----list&lt;/span&gt;                           - 活动列表页\n            |&lt;span class=&quot;hljs-params&quot;&gt;----h5&lt;/span&gt;                             - h5页面\n        |&lt;span class=&quot;hljs-params&quot;&gt;----auto&lt;/span&gt;                               - 可视化构建部署\n        |&lt;span class=&quot;hljs-params&quot;&gt;----doc&lt;/span&gt;                                - 文档\n    |&lt;span class=&quot;hljs-params&quot;&gt;----App&lt;/span&gt;.vue                                - 入口vue实例\n    |&lt;span class=&quot;hljs-params&quot;&gt;----main&lt;/span&gt;.js                                - 入口js文件\n    |&lt;span class=&quot;hljs-params&quot;&gt;----permission&lt;/span&gt;.js                          - 路由守卫\n|&lt;span class=&quot;hljs-params&quot;&gt;----vue&lt;/span&gt;.config.js                              - vue/cli配置\n'"></code></pre>
</div>
</div>
</template>

<script>
/** eslint-disable **/

export default {
    components: {

    },
    mixins: [

    ]
};
</script>
