## 无题

template->render

这里的 template 就是虚拟 dom 的部分，我们需要先将真实的 DOM 转换为虚拟 DOM(说是虚拟 DOM，其实就是 JS 对象的形式)，这样的话我们就能够遍历这个对象然后精确的找到我们变动的地方，最后以达到精确更新视图的目的。

虚拟 DOM 出现的目的就是为了后面做 Diff 算法，提高我们的性能。虚拟 DOM 就是一个中间层。
想处理一个复杂问题需要通过封层的方式去解决

生成虚拟 dom 的函数是 h 函数，然后生成的虚拟 dom 还得转换成我们真实的 dom 去挂载到外层容器上，这个过程我们要参考 vue 中的 mountElement 方法

关于虚拟 Dom 这块中的 props，因为 props 类型比较多，所以这里的 props 会以对象的形式出现