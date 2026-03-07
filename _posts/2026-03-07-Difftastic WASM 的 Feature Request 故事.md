---
layout: post
title: Difftastic WASM 的 Feature Request 故事——从 2022 到 2025 的坚持
---

# Difftastic WASM 的 Feature Request 故事——从 2022 到 2025 的坚持

## 一个迟到的 Dream Request

2022 年 10 月 15 日，GitHub 用户 CetinSert 在 Difftastic 项目中提交了一个 feature request：[Make WASM builds #407](https://github.com/Wilfred/difftastic/issues/407)。

这个 request 很简洁，却充满想象力：

> difftastic would benefit greatly from wasm builds! It would open the project up to web browsers, deno deploy, bun oven, cloudflare workers!

CetinSert 的想法很清晰——如果 difftastic 能编译成 WebAssembly，就可以直接在浏览器中运行，打开一个全新的应用场景。然而，看似美好的想法却遇到了现实的障碍。

项目维护者 Wilfred 在回复中坦诚地说出了困难所在：

> The fiddly bit is getting the tree-sitter parsers compiled to wasm, as they're C code.

这个阻力是很现实的。Difftastic 的核心依赖 tree-sitter（一个增量解析库），而 tree-sitter 本身是用 C 实现的。将 C 代码编译成 WebAssembly 不是个小工作。

## 三年的等待

随后的三年里，这个 issue 吸引了不少关注：

- 2024 年 3 月，MRYingLEE 指出 tree-sitter 本身已经有 WASM 版本存在，问能否基于此构建 Difftastic 的 WASM 版本
- 2024 年 4 月，psymbio 追问可行性，希望能了解详细的构建指南
- 2025 年 7 月，marcelroed 表达了对浏览器版本的渴望——能直接粘贴代码，在网页中看到 diff 效果

有趣的是，AI 大模型的发展似乎改变了这个故事的走向。

## AI 来救场

2025 年 11 月 23 日，CetinSert 做了一个决定——让 AI 来解决这个问题。他宣布：

> I have set Codex, Claude, and Gemini CLIs loose on this task! All with their highest tier subscriptions. I will update you all with the results!

他同时调用了三个 AI 大模型的最高级别版本来处理这个任务：

- **Codex**（OpenAI 的 GPT-5.1-codex-max，最高等级）
- **Claude**（Anthropic 的高级版本）
- **Gemini**（Google 的高级版本）

结果如何呢？

> Codex is messing with WASI things. Gemini is lost in an infinite loop. Claude compiled and confirmed a build.

看起来 Claude 表现最佳，成功完成了编译。但转折来了——

> Codex did actually deliver (gpt-5.1-codex-max xhigh)!

咦？Codex 最终还是交付了成果！而且是最好的成果。

## 从 120M 到 98M——优化的艺术

2025 年 11 月 25 日，CetinSert 在 GitHub 上创建了一个 fork（[Elefunc/difftastic](https://github.com/Elefunc/difftastic)），分享了初步的 WASM 构建成果。

最初的 WASM 文件有 120MB，这对一个浏览器应用来说显然太大了。不过 CetinSert 没有放弃，继续优化。到了 11 月 26 日，他成功地将文件大小压缩到了 98MB——比原始的 Linux 二进制文件（106MB）还要小！

虽然看起来仍然很大，但要记住这 98MB 包含了 difftastic 支持的**所有 tree-sitter 解析器**。这是一个完整、功能齐全的 WASM 构建。

## Online Playground 的诞生

更令人兴奋的是，CetinSert 不仅提供了 WASM 构建，还搭建了一个在线 playground：**[dt.rt.ht](https://dt.rt.ht/)**

这个 playground 融合了三个不同的 diff 工具：

1. **difftastic** —— 语义化的 diff 展示
2. **GNU diff** —— 经典的行差异比较
3. **Monaco 编辑器的 diff** —— 微软 Monaco 编辑器内置的差异编辑器

所有三个工具都支持实时同步——您在文本框中编辑，所有的 diff 展示都会实时更新。这是一个非常友好的交互体验。

## 性能优化的故事

初期的 cold load 时间是 7160 毫秒。这么长的加载时间显然不理想。CetinSert 决定使用 CDN 缓存来加速，结果呢？

加载时间从 **7160ms 降至 436ms**。

这段优化背后反映了实际部署的思考——不仅要有功能，还要有良好的用户体验。通过 CDN 缓存 WASM 资源，CetinSert 大幅降低了首次加载的延迟。

## 社区的响应

整个过程中，社区的反应也很积极：

- **Master-Hash** 成功地使用 wasmtime 运行了编译出的 WASM 版本
- **gaojunran** 表示想要加入这个项目
- 一个拉取请求 [#927](https://github.com/Wilfred/difftastic/pull/927) 被创建，试图将 WASM 支持合并进主仓库

这三年半的等待，最终开了一个有趣的局面。

## 反思：AI 改变了什么

这个故事最有意思的地方在于时间线：

- **2022-2025**：这个 feature request 基本上是搁置的，虽然有人讨论，但没有人真正着手实现
- **2025 年 11 月**：一个决定性的转折——CetinSert 决定用 AI 来尝试

Codex 最终成功完成了这个任务。这不是简单的"AI 能做什么"的问题，而是"某些人需要勇气去尝试用新工具"的问题。

时至 2026 年 3 月，我们回头看这个故事：

- ✅ WASM 构建成功
- ✅ Online playground 上线运行
- ✅ 社区积极响应
- ✅ 朝向上游合并的努力正在进行

这可能是开源社区中 AI 辅助开发的一个有趣案例——不是 AI 凭空创造了什么，而是 AI 成为了解决长期遗留问题的催化剂。

---

## 相关链接

- [Difftastic 官方项目](https://github.com/Wilfred/difftastic)
- [Feature Request #407：Make WASM builds](https://github.com/Wilfred/difftastic/issues/407)
- [WASM 版本 fork（Elefunc）](https://github.com/Elefunc/difftastic)
- [Online Playground](https://dt.rt.ht/)
- [CI 工件（支持 WASI 目标）](https://github.com/Master-Hash/difftastic/releases/tag/untagged-53ae0e2c3c8a50b33462)

> 注：本文主要由 AI 编写，人类负责提供故事来源，想法和思路。
