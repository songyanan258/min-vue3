
import { effectWatch } from './reactive/index.js'
import { mountElement } from './renderer/index.js'
/**
 * 
 * @param {Object} rootComponent  根组件
 * @returns  返回我们的App对象
 */
export function createApp(rootComponent) {

  return {
    /**
     * 挂载函数
     * @param {Object} rootContainer 外部容器 
     */
    mount(rootContainer) {
      //我们的响应式数据
      const context = rootComponent.setup()
      //用effect处理我们的更新视图的逻辑
      effectWatch(() => {
        //这里的render方法返回一个渲染后的视图对象，最终挂载到根容器上面
        const vNode = rootComponent.render(context)
        mountElement(vNode, rootContainer)
        // rootContainer.append(element)
      })
    }
  }
}