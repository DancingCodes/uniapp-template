# uniapp-template

本项目通过以下命令基于官方模板初始化：

```bash
npx degit dcloudio/uni-preset-vue#vite-ts ProjectName
```

当前内容是在基础模板之上进行 uni-app 版本更新，并按项目需要添加其他依赖。

## 1. 安装依赖

在项目根目录执行：

```bash
npm install
```

## 2. 更新 uni-app 正式版依赖

使用 UVM 更新到最新稳定版：

```bash
npx @dcloudio/uvm@latest
npm install
```

## 3. 控制台漏洞说明

安装后看到较多 `npm warn deprecated` 或 `npm audit` 漏洞提示，主要原因是：

- uni-app 同时安装了 H5、App、鸿蒙和多个小程序平台的构建包，未使用的平台也会被审计。
- Jest、Jimp、PostCSS、esbuild、Rollup、ws 等属于构建或测试工具的间接依赖。
- 部分依赖已经停止维护，必须等待 DCloud 或上游工具链替换，不能单独安全升级。