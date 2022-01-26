<template>
<!-- eslint-disable -->
<div class="v-docs">
<div class="markdown-body"><h4>9、后端服务</h4>
<hr>
<p>后端服务本期不作为重点，只起到了一个作用，就是 CURD，但后期有优化空间，比如随着活动页面及页面组件的不断增多，JSON字符串会无限变大，直至字段存储爆表，优化方向，活动页面拆分，以表关联的方式降低字段存储压力</p>
<pre class="hljs language" data-lang=""><code v-html="'&lt;span class=&quot;hljs-string&quot;&gt;|----app&lt;/span&gt;\n    &lt;span class=&quot;hljs-string&quot;&gt;|----controller&lt;/span&gt;\n    &lt;span class=&quot;hljs-string&quot;&gt;|----model&lt;/span&gt;\n    &lt;span class=&quot;hljs-string&quot;&gt;|----router&lt;/span&gt;\n    &lt;span class=&quot;hljs-string&quot;&gt;|----service&lt;/span&gt;\n&lt;span class=&quot;hljs-string&quot;&gt;|----config&lt;/span&gt;\n    &lt;span class=&quot;hljs-string&quot;&gt;|----config.default.js&lt;/span&gt;\n    &lt;span class=&quot;hljs-string&quot;&gt;|----plugin.js&lt;/span&gt;\n        - egg-cors\n        - egg-sequelize\n&lt;span class=&quot;hljs-string&quot;&gt;|----sh&lt;/span&gt;\n    &lt;span class=&quot;hljs-string&quot;&gt;|----deploy.sh&lt;/span&gt;\n'"></code></pre>
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
