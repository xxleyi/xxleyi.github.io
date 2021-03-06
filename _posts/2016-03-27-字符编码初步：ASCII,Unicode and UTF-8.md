---
title: "字符编码初步: ASCII,Unicode and UTF-8"
date: 2016-03-27
---

# 字符编码初步: ASCII,Unicode and UTF-8

再也不愿意在 Windows上 coding 了，烦死个人啊，受不了各种问题。

本来就各种编程知识不懂，还要忍受各种编码和库的安装问题。

打算直接模仿 Github 上 egrcc 的一个 ython2.7 知乎爬虫开始学习。那第一步就是把人家的代码正确运行出来，作者说他是在 Ubuntu 平台上实验的。我看了看以后，发现也是做了 Windows 的一些支持的，也考虑到了编码问题。

遇到问题如下：

>termcolor 库和 html2text 是我之前没有的，但安装过程也是坑了，都不能直接用 pip 安装不说，还各有各的坑。
>
>初步运行成功后，我换了其它问题和用户实验，结果发现转 GBK 编码那块老出 bug，不同的问题和用户，bug 点还不一样。
>
>由于这已经是第好几次遇见编码问题，记得之前有一次就好好看了看编码问题，但现在又忘了大部分，只记得了 encode 和 decode 的概念，但这个概念本身也有些记忆不清，傻傻分不开。

所以，我就决定借此机会好好了解一些最基本的。网上搜了，看了几篇，最后看到阮一峰老师的一篇老博客，讲得很棒。学习了一下，也想着给自己新开的博客写点东西，也算是记录自己的学习吧。

大部分思路都是沿承自阮一峰老师，在此表示十分感谢，我会尽量凭自己的记忆和理解写下来，偶尔偷看几眼，最后成文估计会很像，但希望老师不会介意，毕竟俺也只是无名之辈。

首先，我先自己去看了编码和解码的准确定义。我现在的理解是，编码和解码本就是相对而言，而在 encode 和 decode 的英文释义中，都和密码文有关。想了想，倒真是可以这么理解。

对于信息而言，都是以一定规则组织起来的，当同一个信息以不同的规则组织起来，对一般人而言，便不会再懂其意为何了，__此过程可称为编码__。自然地，我拿到一个编码后的信息，我不能直接解读，但只要知道编码规则，便可以 decode，即为解码。

对计算机而言，表示信息以 01 位，为了有效表示信息，有了基本单元 byte 字节，8 位，256 个状态，早期起源于美国，对于他们，256 个状态足够，用不了，只用 128 个，即 7 位便可以。

>这个时候诞生了 ASCII 编码规则，用得很嗨，也很节约资源。

但问题在于，世界上不仅仅有英文，还有稍微复杂的欧洲字母文字，128个状态不够使。他们纷纷各显其能，开始自己搞自己的编码规则，利用起剩下的一位，为自己所用，还不怎么更多地占用资源。

也真是难为他们了，只有一个多余的位，他们也不可能兼容其它欧洲语言去。也就导致了对计算机底层而言一样的一组数据，因为编码方式不同，在不同欧洲国家，往往代表不同的字母。

这个问题必须得到解决啊！

但 __互联网出现以前__，说真的，也无所谓，俺自己国家电脑上的东西，你别国几乎八辈子看不到，操那个闲心干啥咧。

不过，世上有眼光的人总还有。他们在互联网出现之前就搞出了一种 __一统天下的规范__，在这里，全球已知文字都可以囊括在一套规范之下，各家用各家的那一亩三分地。

>解决办法就是，可以用好多个 byte 编码信息。至于具体用多少，我也没怎么看懂，感觉是和具体的编码规则有关。这个 Unicode 规范的具体实现方法有很多，目前最常用的是 UTF-8，貌似是。。。至少 Python 这点很坑，谁叫我刚学会 2.7 。。。。哼哼，等我以后学了 3，学了 C，学了 Java 等等，就再也不受你 Python2.7 的编码之气了。


之前提到 ASCII 时代，欧洲语言在剩的一位上做文章，那东亚呢？尤其是中文，尼玛好几万啊。自然地，有了 byte×byte 的想法，这样就是 256 之平方，6 万多，几乎够用了。这里面还有好几种编码规则，基本是代代改良吧，都向下兼容，我以 GBK 家族记忆。

这样，有了 ASCII Unicode GBK。三者大概关系是，Unicode GBK 向下兼容 ASCII，但互相之间却不兼容。。。。这便是编码问题的根本来源。

想想也是，如果把 GBK 代表范围扩大到同时期的欧洲那边，太多，太多，也太杂，不可能让 Unicode 规范下的编码兼容它们。只能等待时代慢慢抛弃它们了。

Unicode 之下具体的编码方式也有很多，我现在只用记着 utf-8，暂且。

这样，我在 Windows 上的遭遇就可以理解了，因为它娘的控制台只支持以 GBK 编码规则显示中文，也就是说，你若给它一个 utf-8 编码的中文字符串，绝壁的乱码，各种奇形怪状的汉语。

所以在 Python 里，有一些解决方式。就是先以 utf-8 解码，再以 GBK 编码，再用控制台显示。

>但我遇到的问题是：有些 utf-8 解码后的信息无法用 GBK 编码。

最终，我还是打开了自己的笔记本，开了 Ubuntu，安装 termcolor 和 html2text 无障碍，输出信息无障碍，程序完美运行。

再也不相信 Windows 上也一样能 coding 的鬼话了。

>总结，只能安慰自己学了一些编码的基础概念。

送自己一段话：It does not make sense to have a string without knowing what encoding it uses.

愿自己一直记得这句话，且记得：自己本文讲得很不严谨，但也算是给自己编了一个还行得通的关于字符编码的小故事。再接再厉吧！

[阮一峰老师博客地址：http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)

[最后一段话出处：http://www.joelonsoftware.com/articles/Unicode.html](http://www.joelonsoftware.com/articles/Unicode.html)
