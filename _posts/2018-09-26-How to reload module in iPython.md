---
'title': 'How to reload module in iPython'
'date': 2018-09-26
---
# How to reload module in iPython

之前一直懒得去找，今天终于行动了。

在 Python2 中：

{% highlight python %}
  reload(module_name)
{% endhighlight %}

在 Python3 中：

{% highlight python %}
  import importlib
  importlib.reload(module_name)
{% endhighlight %}

或者：

{% highlight python %}
  from importlib import reload
  reload(module_name)
{% endhighlight %}
