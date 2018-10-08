---
'title': 'auto switch input method in MacOS'
'date': 2018-10-08
---
# auto switch input method in MacOS

GhostSKB 本来很好的解决方案，我也为此支付了一笔。但是，随着 Mac 系统升级，此软件失效。找寻许久，等待许久，始终未见很好的解决方案。

终于，于近日综合了两个开源方案，使用最原始，也最简单粗暴的方法，解决了自动切换输入法这一颇为舒服的需求。

怎么解决的呢？

> 1. 利用 issw 切换输入法
> 2. 利用应用切换时的回调通知，后台自动切换输入法
> 3. 利用 Python 良好的胶水特性，直接调用 issw 命令

感谢 vovkasm 和 tiann，没有你们开源的方案，我自己不可能独自解决这个问题。

最终代码如下，请自行安装 issw。

{% highlight python %}
#! /usr/bin/env python
# coding: utf-8

'''
auto switch input method between different applications

if you want to change the app list, modify the var 'en_list' and 'zh_list',
or add your own custom_list.
'''

from __future__ import unicode_literals
from __future__ import division
from __future__ import print_function

from subprocess import call, check_output

from AppKit import NSWorkspace, NSWorkspaceDidActivateApplicationNotification, NSWorkspaceApplicationKey
from Foundation import NSObject
from PyObjCTools import AppHelper

# add your custom apps here, check the bundle id in /Application/xx.app/Contents/info.plist
# or use command: osascript -e 'id of app "Safari"'

en_list = [
    "com.googlecode.iterm2",
    "com.google.Chrome",
    "com.apple.Terminal",
    "com.sublimetext.3",
    "com.apple.Safari",
    "com.sequelpro.SequelPro",
]


zh_list = [
    "com.tencent.xinWeChat",
    "com.tencent.WeWorkMac",
    "com.workflowy.desktop",
    "com.apple.Notes",
]


def get_avaliable_input_methods():

    return check_output(["issw", '-l']).decode().strip().split('\n')


class Observer(NSObject):
    def handle_(self, noti):
        info = noti.userInfo().objectForKey_(NSWorkspaceApplicationKey)
        bundleIdentifier = info.bundleIdentifier()
        if bundleIdentifier in en_list:
            print("found: [%s] active, switch to US" % bundleIdentifier)
            call(["issw", "com.apple.keylayout.US"])
        elif bundleIdentifier in zh_list:
            print("found: [%s] active, switch to Shuangpin" % bundleIdentifier)
            call(["issw", "com.apple.inputmethod.SCIM.Shuangpin"])


def main():
    nc = NSWorkspace.sharedWorkspace().notificationCenter()
    observer = Observer.new()
    nc.addObserver_selector_name_object_(
        observer,
        "handle:",
        NSWorkspaceDidActivateApplicationNotification,
        None
    )
    AppHelper.runConsoleEventLoop(installInterrupt=True)


if __name__ == '__main__':
    main()

{% endhighlight %}
