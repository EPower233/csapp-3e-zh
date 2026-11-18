# 深入理解计算机系统（原书第 3 版）· VitePress 分章阅读版

基于 **VitePress** 与 **VitePress Theme Teek** 构建的《深入理解计算机系统（原书第 3 版）》（CSAPP 3e）中文分章阅读站点，同时保持原始 Markdown 书稿对 Obsidian 等本地编辑器的原生兼容。

- 在线阅读（GitHub Pages）：<https://epower233.github.io/csapp-3e-zh/>
- 书籍入口：[index.md](./index.md) · [全书目录](./%E5%85%A8%E4%B9%A6%E7%9B%AE%E5%BD%95.md)

## 特性

- **按章拆分结构**：全书拆分为书前材料、导论、第 1～3 部分（共 12 章）、附录 A、参考文献与封底；各章首页保留导言与本章目录，小节、家庭作业与练习题答案均为独立页面，左侧导航由 `.vitepress/book-sidebar.json` 驱动。
- **保留原生 Markdown 链接**：书稿中的跨页标题锚点与目录引用保留 Obsidian 可用的原生 Markdown 链接格式，由 `.vitepress/heading-links.mts` 在 VitePress 构建/渲染阶段自动解析并映射到目标页面的实际标题 ID。
- **数学公式与脚注**：通过 `markdown-it-mathjax3` 与 `markdown-it-footnote` 渲染行内/块级公式与脚注。
- **本地全文检索**：启用 VitePress 本地搜索，并在 `.vitepress/config.mts` 中清洗标题内嵌链接以便精确索引。
- **矢量插图资源**：全书 294 张 SVG 插图存放在 `public/figures/`，并适配浅色/深色主题展示。

## 目录结构

```text
├── index.md                              # 站点首页
├── 全书目录.md                            # 全书总目录、图表与代码清单索引
├── 深入理解计算机系统（原书第 3 版）.md    # 书名封面页
├── 00 书前材料/                           # 前言、教学指南
├── 01 导论/                               # 第 1 章 计算机系统漫游
├── 02 第 1 部分 程序结构和执行/            # 第 2～6 章
├── 03 第 2 部分 在系统上运行程序/          # 第 7～9 章
├── 04 第 3 部分 程序间的交互和通信/        # 第 10～12 章
├── 05 附录与参考文献/                     # 附录 A 错误处理、参考文献.md
├── 06 书后材料/                           # 封底.md
├── public/figures/                       # 全书 SVG 插图（294 个）
├── .vitepress/                           # VitePress 配置、侧栏、标题锚点插件与 Teek 主题
└── .github/workflows/deploy.yml          # GitHub Pages 自动构建与部署工作流
```

