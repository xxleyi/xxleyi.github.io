---
'title': '实践了一把 git cherry-pick hash-code'
'date': 2018-11-08
---
# 实践了一把 git cherry-pick hash-code

今天遇到紧急异常情况，线上改库，删除一条记录，更改两条记录。

之后为了完善代码逻辑，临时新增了一个 commit，恰好这个 commit 需要紧急部署到 master，故而采用了 cherry-pick 的方式。

不幸的是，自己这小小的改动，竟然还是出错了。导致前端直接报 500 错误。

于是紧急修复 bug，再次使用了 cherry-pick。

由于是先部署了 master，develop 也同样报错。

但在部署 develop 时，搞错了目标服务器。

低级错误的经验，今天收获了两个。

很不应该。之后应该绝对避免。