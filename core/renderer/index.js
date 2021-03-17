
//虚拟Dom转换成真实的DOM
/**
 * 
 * @param {Object} vNode 虚拟DOM
 * @param {Object} container 外部容器
 */
export function mountElement(vNode, container) {
  //参考h函数的tag，props，children

  const { tag, props, children } = vNode
  //tag
  const element = document.createElement(tag)

  //props
  //props类型比较多，所以props的类型其实

  //首先判断props非空

  if (props) {
    for (const key in props) {
      const val = props[key]
      element.setAttribute(key, val)
    }
  }

  //children

  //如果children是一个字符串，即我们的子节点是一个纯文本节点
  if (typeof children == 'string') {
    element.append(document.createTextNode(children))
  } else if (Array.isArray(children)) {
    //如果children是一个数组的形式
    children.forEach(item => {
      //递归挂载子节点
      mountElement(item, element)
    })
  }
  container.append(element)
}