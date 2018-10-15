---
'title': '终于找到从 enriron 中读取 post body 的方法'
'date': 2018-10-15
---
# 终于找到从 enriron 中读取 post body 的方法

百般搜索之下，终于找到从 Django request\_start 信号中得到 post 请求体的方法。

答案是最好使用第三方库。。。

因为 post 请求下，请求体是以某种类似文件的格式传递过来的参数，需要针对这个文件进行特殊处理，读取其中内容，然后还要用 seek 将其归位。

{% highlight python %}
\# python3 only
pip install WebOb

from webob import Request

r = Request(wsgi.environ)
body = r.body.decode()
{% endhighlight %}
