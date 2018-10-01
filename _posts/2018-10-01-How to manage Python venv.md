---
'title': 'How to manage Python venv'
'date': 2018-10-01
---
# How to manage Python venv

目前作为 Python 开发，会频繁与虚拟环境打交道，但目前却没有一个很好的管理虚拟环境的好方法，这一切都是因为我不愿意使用 Pycharm。

那怎么办呢？

- 利用 virtualenv 新建位于项目根目录下的 venv 虚拟环境（便于使用 anaconda 包查看源文件）
- Pipenv 是未来，但目前还不是很好用，尤其是 lock 过程特别慢
- 然后是利用 autoenv 来自动激活虚拟环境
- 方法是正确安装、配置并初始化好 autoenv，并在项目根目录下新建 .env 文件，写上 激活 venv 的命令，如此一来，每次进入项目路径，会自动激活当前虚拟环境

目前，这是经过一番实验之后，找到的最佳解决方案。嗯，暂且如此吧。