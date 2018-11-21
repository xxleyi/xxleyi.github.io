---
'title': 'values_list and UniqueTogetherValidator'
'date': 2018-11-16
---
# values\_list and UniqueTogetherValidator

今天在赶昨天没有完成的接口工作。

经过这一轮新需求的开发，对于 Django serializers 有了更进一步的使用和理解。涉及到了各种 validate 方法的使用，以及对于 patch 方法、delete 方法和 create 方法的全面定制，比较不常见的是，还涉及到了 UniqueTogetherValidator 的使用。

此外在查询时，再次用到了 values\_list，经过晚上看文档，发现了更多 values\_list 的使用方法，包括 named\_tuple 和 flag 两个可选参数，以及后面跟随 get 方法时直接取出某一条记录的某个字段值这个便捷方法。

其它的，还从同事那里知道了 slugserializer 这一类型，与 values\_list 中的 flag=True 异曲同工。

最后呢，实践了一下 python-box 库，书写方便，代码也更为清晰，不再有很多繁琐的  get 方法，看起来特别不顺畅。