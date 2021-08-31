module.exports = {
    extends: ["@commitlint/config-conventional"],
    // 以下时我们自定义的规则
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat", // 新功能
                "fix", // bug修复
                "docs", // 文档改动
                "style", // 代码格式
                "refactor", // 代码重构
                "test", // 测试代码
                "chore", // 构建相关
                "revert", // 回滚代码
                "merge" // 合并分支
            ]
        ]
    }
};
