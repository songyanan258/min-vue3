import { effectWatch, reactive } from './core/reactive/index.js'
import h from './core/reactive/h.js'
export default {
  render(context) {
    // const div = document.createElement('div')
    // div.innerText = '小明:' + context.state.count
    // return div
    return h('div', {
      id: 'appId',
      class: 'class'
    }, '小明:' + context.state.count)
  },
  setup() {
    const state = reactive({
      count: 0
    })
    window.state = state
    return {
      state
    }
  }
}