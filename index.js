import { createApp } from './core/index.js'
import App from './App.js'

//这个地方执行的是挂载操作，引入我们的APP根组件
createApp(App).mount(document.querySelector('#app'))