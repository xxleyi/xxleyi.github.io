---
'title': '总结 Python 的 os 和 sys 模块'
'date': 2017-09-26
---
# 总结 Python 的 os 和 sys 模块

## os 模块

- 识别操作系统类型
- 操作操作系统的文件目录
	- 获取当前工作目录
	- 获取文件的绝对路径
	- 合成兼容不同操作平台的文件路径
	- 判断文件或目录是否存在
	- 创建目录（需要创建文件时，可先识别文件是否存在，再用 open ）
	- 其他方便的操作


## sys 模块

功能有很多，暂时只关注两点：
- 接收运行 python 文件时传入的参数
- 主动退出执行过程