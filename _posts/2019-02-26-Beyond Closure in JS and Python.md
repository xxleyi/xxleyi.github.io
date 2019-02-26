---
'title': 'Beyond Closure in JS and Python'
'date': 2019-02-26
---
# Beyond Closure in JS and Python

闭包从何而来？为什么会有闭包？

先来看一下维基百科上对于 Closure 的定义。

**Closure:** 
- In programming languages, a closure, also lexical closure or function closure, is a technique for implementing **lexically scoped name binding** in a language with **first-class functions**. 
- Operationally, a closure is a record storing **a function** together with **an environment**. 
- **The environment is a mapping** **associating each free variable of the function** (variables that are used locally, but defined in an enclosing scope) **with the value or reference** to **which the name** was bound **when the closure was created**. 
- Unlike a plain function, a closure allows the function to access those captured variables through the closure's copies of their values or references, even when the function is **invoked outside their scope**.

其中的关键是 **first-class functions** 和 storing **a function** together with **an environment**。

first-class functions 比较好了解，就是做到了函数可以被作为值传递给函数或被函数返回。但这里的 environment 是个什么东西呢？貌似是个很关键的东西。

经过一番深究之后，发现 environment 这个玩意确实是个很基本，但又具备着强大的解释能力。简而言之，它是一种简单的数据结构，可以用作动态语言变量管理的基本模型。至于具体怎么实现，如何实现，实现到什么程度，做哪些特殊处理，就要看语言本身自己的意愿和能力了。

然后就变成了这样一个问题：**动态语言中的变量管理**为什么很重要？而它具体又干了一个什么事呢？很简单，就是确定一个 name 的值到底是什么。怎么确定呢？environment 模型给出的答案就是其意思本身所指的那样：通过环境确定或修改一个 name 的值。这个 environment 模型以 frame 为基础，每一个 frame 可以用一个字典来维持 name 和 value 的映射关系，不同 frame 之间有着明确的父子关系，子 frame 可以访问并修改父 frame 中的映射关系。

以上就是 environment 模型的全部。

有了 environment 模型，再加上 first-class functions，closure 就变成了一个再自然不过的特性。

剩下的事情就是想明白一件事：**scope 和 environment model 是不是一回事。**

[代码演示][1]

[1]:	https://github.com/xxleyi/issue_lists/issues/11