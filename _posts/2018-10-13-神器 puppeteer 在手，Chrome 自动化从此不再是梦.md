---
'title': '神器 puppeteer 在手，Chrome 自动化从此不再是梦'
'date': 2018-10-13
---
# 神器 puppeteer 在手，Chrome 自动化从此不再是梦

shell 自动化的美梦成真之后，想起了浏览器的自动化。

在入行编程时，我学的是爬虫，实习时也是爬虫。只是在正式工作之后，才转到后端。爬虫还是挺好的，因为它强调自动化，帮助人们自动获取海量信息。

> **搜索引擎说白了，就是爬虫嘛。**

不是要说爬虫 low，恰恰相反，举这个例子恰好是要说爬虫很高级。尤其是「爬虫」背后的自动化思想。

以后应该不会以爬虫作为主业，但是这不妨碍自己利用遗留的爬虫思想来帮助自己更好地完成一些工作：比如浏览器自动化测试。

现在自动化浏览器已经很成熟，老牌的 Webdriver 强调跨平台，对我而言不是一个好选择。

因此，我选择 Puppeteer，由 Chrome DevTools team 维护。官方简介：

> Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.

一看就有前途：专业团队维护，使用最新技术，聚焦于 Chrome 平台。

除此之外，最近也发现了 Puppeteer 的好搭档：Puppeteer recorder，一款 Chrome 扩展，可自动记录浏览器页面上的操作，生成 Puppeteer 脚本。

完美。

Puppeteer recorder 之余 Puppeteer，恰如 autoexpect 之于 expect。

从此，Terminal shell 和 Chrome 的自动化均不再是梦。

---- 

后记：

Puppeteer 是 node 下的一个库。为了更好地使用 Puppeteer，简单搜了一下 node 的版本管理。发现 nvm 是很好的选择。

-  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh \| bash
- nvm install node(or certain version, node is alias to latest version)
- nvm ls