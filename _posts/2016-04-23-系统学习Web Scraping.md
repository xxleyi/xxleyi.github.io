---
title: "系统学习Web Scraping"
date: 2016-04-23
---

# 系统学习网络爬虫

1. 从一个主域名获取 HTML 数据
2. 解析数据，获得目标信息
3. 存储目标信息到文件或数据库
4. 移动到另一个页面继续采集信息

电脑和服务器的通信：

电脑端发送请求，包含请求类型，请求内容，以及自己的地址和服务器地址

接着就是通信过程。。。。。。

最终，目标服务器会收到请求，回复请求，发送一个包给电脑端。

电脑端的浏览器充当的作用是为我们封装发送数据，并解析收到的数据。

浏览器只是一系列的代码，我们同样可以自己写代码实现这个联网并获取信息的过程。

下面都是以 Python3 为基准。

urllib.request 中的 urlopen 可以打开一个网址，然后利用 read() 方法读取 html 的内容。

另一强大便利的库是 BeautifulSoup，可以将读取到的 html 内容转化为健壮性很强的对象，很适合摘取目标信息。

但，学习的第一课是：

>处理异常，防止爬虫中断。


{% highlight python %}

  from urllib.request import urlopen
  from urllib.error import HTTPError
  from bs4 import BeautifulSoup

  def getTitle(url):
     try:
         html = urlopen(url)
     except HTTPError as e:
         return None
     try:
         bsObj = BeautifulSoup(html.read())
         title = bsObj.body.h1
     except AttributeError as e:
         return None
     return title

  title = getTitle(url)

  if title ==None:
      print('Title could not be found')
  else:
      print(title)

{% endhighlight %}

以上是一个处理异常的实例，目的在于告诫自己，处理异常很重要。

>解析 html 数据的一些方法

去除我们不需要的数据。锁定目标信息时尽量避免太多层级的搜索，这样很容易发生错误，目标网页也很容易改变。

1. 是不是可以获取简单一些的 html，比如打印版，比如手机版，等等。
2. 寻求隐藏在 JS 中数据。为此需要处理 JS 文件。
3. URL 自身或许就携带了我们需要的数据。
4. 换数据源。

>BS中对象：

1. BS 对象
2. Tag 对象
3. NavigableString 对象
4. Comment object

>dealing with children and other descendants

1. children 是孩子，descendtants 是所有后代

>dealing with siblings

1. next_siblings
2. previous_siblings
3. 以上都可以是单数

>dealing with parents

{% highlight python %}

  #利用函数语句里的括号换行，如果没有，可以自己加括号，但尽量不要使用\连接符。
  print(bsObj.find("img", {"src":"../img/gifts/img1.jpg"}).
        parent.previous_sibling.get_text())

{% endhighlight %}

正则表达式 regex

正则表达式是什么？ 一系列规则是核心。

aa\*bbbbb(cc)\*(d | )

[A-Za-z0-9\\.\_+]+

\* 个数为0到无穷

+个数为1到无穷

[] 字符集

() 定义一个小规则群

{m,n} 表示个数的范围

[^] 字符集的补集

| 或

. 表示任何一个【单个字符】

^ 表示一个字符或子表达式规定的字符群出现在字符的开始

\\ 可以让特殊字符表示本来文本愿意

$ 放在结尾，否则正则表达式默认最后有个\*

?! 不包括一定规则的字符串

{% highlight python %}

  images = bsObj.findAll('img', {'src': re.compile('\.\./img/gifts/img.*\.jpg')})

{% endhighlight %}

BS 允许使用 lambda 表达式，条件是，其函数参数必须为 Tag 对象，且返回 Boolean 值。

>soup.findAll(lambda tag: len(tag.attrs) == 2)

除了 BS 以外，不要忘了其它可以用于 Python Scraping 的库，根据需求，可以择优选择。

1. lxml，基于 c，可以解析 HTML 和 XML，学习曲线比较陡峭，但值得一学，解析速度很快。
2. HTML Parser Python 内建的解析器，非常方便。


dark Internet
