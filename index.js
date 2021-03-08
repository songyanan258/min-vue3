import { effectWatch, reactive } from './reactive/index.js'
//声明一个响应式对象
let a = reactive({
  age: 19
})
let b;
effectWatch(() => {
  //响应式函数

  b = a.age + 10
  console.log(b)
})
//响应式对象的值发生改变以后，执行响应式函数
a.age = 30