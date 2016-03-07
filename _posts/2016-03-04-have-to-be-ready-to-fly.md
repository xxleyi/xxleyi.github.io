---
layout: post
title: "测试代码高亮"
date: 2016-03-04
---


可以不飞翔，但不能没有翅膀
===


我一无所有，才无所顾忌？
---

{% highlight python %}
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import cmd
import sys

reload(sys)
sys.setdefaultencoding('utf-8')


class CLI(cmd.Cmd):

    def __init__(self):
        # get the sensitive word list
        cmd.Cmd.__init__(self)
        self.intro = 'Filtered Words Detective'
        self.words = map(lambda i: i.strip('\n'), open('fliter_words.txt', 'rt').readlines())
        self.prompt = "> "   #define command prompt

    def default(self, line):
        # if any([i in line for i in self.words]):
        #     print 'Freedom'
        # else:
        #     print 'Human Rights'
        for word in self.words:
            # print word >= u'\u4e00' and word <= u'\u9fa5'
            if line.find(word) != -1:
                print line.replace(word, '*' * len(word)) #注意汉字长度

    def do_quit(self, arg):
        exit()
        return True

if __name__ == "__main__":
    cli = CLI()
    for word in cli.words:
        print word
    cli.cmdloop()

{% endhighlight %}

'''python
if __name__ == "__main__":
    cli = CLI()
    for word in cli.words:
        print word
    cli.cmdloop()
'''
