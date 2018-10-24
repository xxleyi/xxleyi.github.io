---
'title': 'Remove Finder From cmd+tab'
'date': 2018-10-24
---
# Remove Finder From cmd+tab

今天的工作就是走正常流程，在代码 review 和测试的过程中，发现代码本身的问题，修复相关 bug。

很好的体验是通过 sentry 报错机制，基本可以在不登录线上服务器的情况下排查掉大部分小问题。

除此之外，确定了下一步的工作重心将转移到 H5 和 App 这边，审核平台后期优化和需求追加基本交给风控部门的人员。

其他的嘛，就是今天的主题，进一步优化了自己的工作流，修正了 VS Code 使用过程中 git 提示的问题，每日往前一小步。

怎么个优化法呢？

** Remove Finder From cmd+tab**

就是对 Finder 做一个特殊处理，不让它出现在 cmd+tab 调出的多任务切换界面中。之前做过的一个优化是：不让 iTerm 出现在其中。

采用方式就是修改 /System/Library/CoreServices/Finder.app/Contents/Info.plist 文件，在 dict 中添加：

> \<key\>NSUIElement\</key\>
> \<string\>1\</string\>

之后终端执行 killall Finder，来强制重启 Finder。

对电脑使用的优化，持续进行中，不知道下一步会去往何方，我也很好奇。

