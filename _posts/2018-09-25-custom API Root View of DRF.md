---
'title': 'custom API Root View of DRF'
'date': 2018-09-25
---
# custom API Root View of DRF

在 DRF 中，ViewSets 配合 Router 使用可以很方便的生成 Browsable API Docs。这一点很棒，比较遗憾的是，如果针对 ViewSets 做一些定制，在 URL 中添加正则表达式之后，自带的 DefaultRouter 将无法识别。

研究了一下源码，简单 Hack 一下，组装成一个定制 Router，可用。

代码如下：

{% highlight python %}
from rest_framework.routers import DefaultRouter, APIRootView


class CustomAPIRootView(APIRootView):

    def get(self, request, *args, **kwargs):

        ret = super().get(request, *args, **kwargs).data

        import re
        from django.urls import NoReverseMatch
        from rest_framework.response import Response
        from rest_framework.reverse import reverse
        for key, url_name in self.api_root_dict.items():
            reg = re.findall('\(.*?\)', key)
            if not reg:
                continue

            custom_args = tuple(request.query_params.values())
            if not custom_args:
                custom_args = [1] * len(reg)
            try:
                ret[key] = reverse(
                    url_name,
                    args=custom_args,
                    kwargs=kwargs,
                    request=request,
                    format=kwargs.get('format', None)
                )
            except NoReverseMatch:
                continue
        return Response(ret)


class CustomRouter(DefaultRouter):

    APIRootView = CustomAPIRootView


router = CustomRouter()
{% endhighlight %}
