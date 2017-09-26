---
'title': '总结 Python 的 module 相关知识点'
'date': 2017-09-27
---
# 总结 Python 的 module 相关知识点

## module 初级概念
当使用 Python 进行项目开发时，模块化是必然的选择，否则项目将无法管理。在现代编程项目中，使用任何语言都是如此。

由于 Python 是一门动态语言，可以在解释器的环境下一句句的执行：**所写即所运行。**这在摸索一些概念和尝试一点小想法时还算比较方便。

但只要稍稍复杂一点，就必然会选择将代码写在文本文件中，俗称**脚本**。

在一个脚本中，有可能一个函数没有，一个类没有，就是 100% 的面条代码；也有可能是由层次清晰的函数构成，最后提供一个统一入口；也有可能是由关系界限分明的类构成，最后搭配一个入口。

然后呢？如果再复杂一点，就需要将函数和类的定义分别放置在不同的文件甚至是不同的文件夹当中。此时，整个项目只会需要一个文件作为**程序运行的入口**。

Python 使用一个保留变量 \_\_name\_\_ 和方便的文件即模块的设计来实现代码的模块化组织。

当文件作为主程序入口时，\_\_name\_\_ 就等于字符串 \_\_main\_\_；当文件作为模块运行时，\_\_name\_\_ 就等于文件即模块的名字。

每一个文件都有一个单独的符号表存储变量作用域，主文件中最外层的变量是全局变量，其余模块的变量归于模块名字之下，模块变量之间的关系由导入关系确定。

## module 的搜寻路径

当遇到 import 语句时，Python 解释器首先查找内置的模块列表，然后再到 sys.path 中查找。

其中 sys.path 中包含以下部分：

- 包含输入脚本的文件目录
- PYTHONPATH，类似 shell 中的 path
- 安装的第三方库

## 缓存的编译好的二进制模块文件

当初次导入时，会转译成平台无关的二进制文件，如果下一次未改变源代码，就可以重复利用。

dir() 查看某个模块或某个函数或某个类的成员，包括属性，方法，函数，类，等等。

查看内置模块需要使用特殊语句，先导入 builtins ，再 dir(builins) 查看。

## pakages 管理模块，通过 .. 相对路径

>  Packages are a way of structuring Python’s module namespace by using “dotted module names”.For example, the module name A.B designates a submodule named B in a package named A. Just like the use of modules saves the authors of different modules from having to worry about each other’s global variable names, the use of dotted module names saves the authors of multi-module packages like NumPy or the Python Imaging Library from having to worry about each other’s module names.

>  The \_\_init\_\_.py files are required to make Python treat the directories as containing packages

> when using syntax like import item.subitem.subsubitem, each item except for the last must be a package; the last item can be a module or a package but can’t be a class or function or variable defined in the previous item.

## Importing \* From a Package

当从一个包中导入**所有**时，并不像从一个模块中导入那样。因为一个包可能有很多嵌套，这个时候，包路径下的 \_\_init\_\_.py  就可以发挥除了标识“包”的另一个作用：**定义所有具体指哪些子包或模块**。

## Intra-package References

在一个包内部各个模块中导入其它模块时，除了使用绝对路径之外，还可以使用相对路径：

- 当前目录 .
- 父目录 ..
- 父目录下的某个子目录 ..child\_dir

## Packages in Multiple Directories

>  Packages support one more special attribute, \_\_path\_\_. This is initialized to be a list containing the name of the directory holding the package’s \_\_init\_\_.py before the code in that file is executed. This variable can be modified; doing so affects future searches for modules and subpackages contained in the package.

#### footnote：Python 中的函数声明是顺次执行的，这也是 Python 模块中不需要额外声明函数变量的原因：当模块被导入时，函数声明会被自动执行，函数变量也会进入变量列表。