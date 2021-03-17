//h节点的目的就是为了创建一个虚拟节点 即vdom

/**
 * 
 * @param {*} tag 
 * @param {*} props 
 * @param {*} children 
 * @returns 
 */
export default function h(tag, props, children) {
  //tag
  //props
  //children

  return {
    tag,
    props,
    children
  }
}