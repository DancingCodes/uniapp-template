# Project Instructions

## 项目目标

打造一个使用最新且稳定技术栈的 uni-app 模板。

## 维护原则

- 优先使用 uni-app 和相关工具链的最新正式版，不主动使用 Alpha 或其他预发布版本。
- 更新依赖后执行类型检查，并验证目标平台可以正常构建或启动。
- 保持依赖版本统一，提交 `package-lock.json`，确保安装结果可复现。
- 不使用 `npm audit fix --force` 强行升级依赖，避免破坏 uni-app 工具链兼容性。
- 修改项目配置或依赖时，同步更新 `README.md`。

## 开发约定

- 使用 Wot Design Uni 作为 UI 组件库，优先使用组件完成布局，保持样式简洁。
- 使用 Pinia 管理主题和用户登录态，主题和语言切换结果需要持久化。
- 使用 `AppPage` 统一页面容器；页面导航使用 `AppNavbar`，底部导航使用 `AppTabbar`。
- 设置页使用 `AppPage` 的 `title` 显示导航栏，TabBar 页面传入 `showTabbar`。
- API 按业务模块放在 `src/api`，页面通过 API 模块调用，不直接拼接请求。
- `src/utils/request.ts` 统一处理请求、Token 和错误提示，成功条件按后端返回的 `result.code === 200` 判断，并直接返回 `result.data`。
- 公共请求层不判断 `data` 是否为空；部分成功接口可以返回 `null`，由具体 API 的调用方校验业务必需字段。
- 异步请求优先使用 `await-to-js` 的 `[error, data]` 写法，避免重复的 `try...catch`。
- 请求错误统一使用 `uni.showToast` 提示；页面不重复解析接口错误响应。
- 修改后运行 `npm run type-check`，不主动执行耗时的打包命令。
