---
'title': '神器 autoexpect 在手，shell 自动化从此不再是梦'
'date': 2018-10-13
---
# 神器 autoexpect 在手，shell 自动化从此不再是梦

就在昨晚睡觉前，无意中发现了两个 expect 脚本的关键技巧：

- debug 模式：#!/usr/bin/expect -d
- autoexpect 生成 expect 脚本（公司电脑在通过 brew 安装了 expect 后，竟然还是无法正常使用 autoexpect，非常诡异。在两个同事的电脑上尝试，都可以直接使用。我自己最终找到的解决方案是 export TCLLIBPATH="/usr/local/lib"。看来和 tclpath 有关，貌似深坑，暂不深究。）

今天睡醒之后，即刻尝试，发现 Mac 自带 expect 不支持 autoexpect。一番简单搜索之后，发现通过 homebrew 安装最新版 expect 即可解决此问题。

brew install expect 之后，便可以通过 autoexpect 命令侦测一些特殊的期待字符，打通关键环节，完成 shell 自动化。