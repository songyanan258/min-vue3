//响应式库

//核心就是收集依赖，触发依赖。订阅发布模式(是因为他不止触发一次，可能会触发多次，所以有个触发依赖模式)

//依赖
let currentEffect;//定义一个全局变量，这个全局变量是为了让effectWatch能和Dep中的depend函数联系起来
class Dep {

  constructor(val) {
    //这个地方用来存储我们收集的依赖
    this.effects = new Set()//用Set创建，是为了收集的东西不能重复，但是Vue3中用的不是effect
    //存储初始默认值
    this._val = val
  }

  //获取值

  get value() {
    this.depend()//在这个地方收集依赖
    return this._val
  }
  //赋值
  set value(newValue) {
    this._val = newValue
    this.notice()//在这个地方触发依赖执行，这个地方有一个细节就是当我们的值变更之后再去通知依赖执行
  }
  //1.收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect)
    }
    //添加依赖
  }

  //2. 触发依赖
  notice() {
    //触发一下我们之前收集到的依赖
    this.effects.forEach(effect => effect())

  }
}
//专门用来收集依赖
function effectWatch(effect) {
  currentEffect = effect
  //第一次收集的时候会调用收集到的依赖函数
  effect()
  //置空
  currentEffect = null
}
function getDep(target, key) {
  let deps = targetMap.get(target)
  //第一次的时候初始化一下
  if (!deps) {
    deps = new Map()
    targetMap.set(target, deps)
  }
  let dep = deps.get(key)
  //第一次dep不存在的时候，初始化一下
  if (!dep) {
    dep = new Dep()
    deps.set(key, dep)
  }
  //上面这堆东西就是为了让key和dep映射起来
  return dep
}

const targetMap = new Map()

function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      //一个key对应一个dep
      //下面需要dep手机依赖

      const dep = getDep(target, key)

      dep.depend()
      return Reflect.get(target, key)
    },

    set(target, key, value) {
      //set的主要作用就是触发依赖
      //1.要货渠道dep对象
      const dep = getDep(target, key)
      //! 这里需要更新值以后才去通知更新
      const result = Reflect.set(target, key, value)
      dep.notice()
      return result
    }
  })
}

export {
  effectWatch,
  reactive
}