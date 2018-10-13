---
'title': '神器 osascript 在手，Mac 指令化从此不再是梦'
'date': 2018-10-14
---
# 神器 osascript 在手，Mac 指令化从此不再是梦

我今天算是跟自动化干上了。

除了终端和浏览器之外，我还想出了借助 Alfred 自由操控 Mac 的方法。

方法也是很简单：利用 Mac 自带 osascript 可自动化执行各种点击和输入操作。

一般情况下，使用 AppleScript 便可，自带 Script Editor app 可以调试和查看程序提供的字典文档。

不是所有程序都有提供字典文档，但是总可以通过点击菜单栏，配合键盘输入来解决几乎所有问题。

开心。

下面是一个示例：**在 HandShaker 中新建 idea pill，内容来自剪切板**

{% highlight AppleScript %}
tell application "HandShaker" to activate
tell application "System Events"
  tell process "HandShaker"
      click menu item "New Text Idea Pill" of menu "File" of menu bar 1
      click
      tell application "System Events" to keystroke "v" using command down
  end tell
end tell
{% endhighlight %}
