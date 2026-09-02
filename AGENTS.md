# Project Instructions

## 项目目标

打造一个使用最新且稳定技术栈的 uni-app 模板。

## 维护原则

- 优先使用 uni-app 和相关工具链的最新正式版，不主动使用 Alpha 或其他预发布版本。
- 更新依赖后执行类型检查，并验证目标平台可以正常构建或启动。
- 保持依赖版本统一，提交 `package-lock.json`，确保安装结果可复现。
- 不使用 `npm audit fix --force` 强行升级依赖，避免破坏 uni-app 工具链兼容性。
- 修改项目配置或依赖时，同步更新 `README.md`。
