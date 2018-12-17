---
'title': '善加利用 Django viewsets'
'date': 2018-12-12
---
# 善加利用 Django viewsets

在大部分时候，利用好 viewsets 便可以构建出一套最为基础的 API。

在 viewsets 中，可以定制 serializer class，可以定制已有的增删查改 action，也可以定制新的 action。

总之，view 中最重要的是大尺度上的业务逻辑。

至于入库之前数据的格式校验、逻辑校验、增删改等工作，应该尽量放在 serializer 中完成。