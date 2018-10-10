---
'title': 'filter and sorted used in Django queryset'
'date': 2018-10-10
---
# filter and sorted used in Django queryset

目前从事 Django 后端开发，前后端分离，使用 DRF，各方面用起来都还挺舒服。但是数据库查询不用 SQL 语句，不用外键关联时，多表联合查询就比较复杂。

在我目前遇到的问题中，遇到了只使用 filter 无法解决的问题。目前我的解决方案是使用 Python 自带的 sorted 和 filter 函数对最终的 queryset 进行进一步排序或过滤，使用这两个方法，借助了 model 层面的 property 方法。

目前为止，倒也不失为一个良好的解决方案。