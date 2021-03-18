


/**
 * diff算法
 * @param {Object} oldVnode 老节点
 * @param {Object} newVnode 新节点
 */
export function diff(oldVnode, newVnode) {
  //标签不一样直接替换
  if (oldVnode.tag !== newVnode.tag) {
    oldVnode.el.replaceWith(document.createElement(newVnode.tag))
  } else {
    //这个地方是将oldVnode.el中的
    newVnode.el = oldVnode.el
    //props不同
    //新增props、删除props、修改props
    const { props: newProps } = newVnode
    const { props: oldProps } = oldVnode
    if (oldProps && newProps) {
      Object.keys(newProps).forEach(key => {
        const newVal = newProps[key]
        const oldVal = oldProps[key]
        //如果新老props不同，则修改
        if (newVal !== oldVal) {
          oldVnode.el.setAttribute(key, newVal)
        }
      })
    } else if (oldProps) {
      Object.keys(oldProps).forEach(key => {
        const newVal = newProps[key]
        const oldVal = oldProps[key]
        //如果没有新props，则删除
        if (!newVal) {
          oldVnode.el.removeAttribute(key, oldVal)
        }
      })
    } else {
      Object.keys(newProps).forEach(key => {
        const newVal = newProps[key]
        oldVnode.el.addAttribute(key, newVal)
      })
    }
    //修改children
    const { children: newChildren } = newVnode
    const { children: oldChildren } = oldVnode

    //如果新的children是字符串
    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        //两者不相等，直接替换
        if (newChildren !== oldChildren) {
          newVnode.el.innerText(newChildren)
        }
      } else if (Array.isArray(oldChildren)) {
        //老的children是数组
        newVnode.el.innerText(newChildren)
      }
    } else if (Array.isArray(newChildren)) {//新的节点是数组
      if (typeof oldChildren === 'string') {
        //先清空节点
        newVnode.el.innerText = ''
        mountElement(newVnode, newVnode.el)
      } else if (Array.isArray(oldChildren)) {
        const length = Math.min(newChildren.length, oldChildren.length)
        for (let index = 0; index < length; index++) {
          const newVnode = newChildren[index]
          const oldVnode = newChildren[index]
          diff(oldVnode, newVnode)
        }

        if (newChildren.length > length) {
          //创建新节点
          for (let index = length; index < newChildren.length; index++) {
            const newVnode = newChildren[index]
            mountElement(newVnode)
          }
        }
        //删除节点
        if (oldChildren.length > length) {
          for (let index = length; index < oldChildren.length; index++) {
            const oldVnode = oldChildren[index]
            newVnode.el.parent.removeChild(oldVnode.el)
          }
        }
      }
    }
  }


}


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
  vNode.el = element

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