---
'title': '如何在 Django 中将日志输出到 supervisor 控制台'
'date': 2018-10-17
---
# 如何在 Django 中将日志输出到 supervisor 控制台

要想让 logging 在输出到文件的同时，也在 supervisor 的控制台，可以采用以下配置。

关键点在于，本质上控制台是 sys.stdout。把握住这一点，将日志以 stream 流的方式打一份，就可以实现不依赖 supervisor 配置本身，在 supervisor 中看到日志输出信息。

{% highlight python %}
from pythonjsonlogger import jsonlogger
# 日志依赖于settings 生效,放到最后面
LOGGING = {
# 此处省略一些东西
	'handlers': {
	    'console': {
	    'level': 'DEBUG',
	    'class': 'logging.StreamHandler',
	    'stream': sys.stdout
	    },
	},
	'root': {
	    'handlers': ['console'],
	    'level': 'INFO',
	},
}
{% endhighlight %}