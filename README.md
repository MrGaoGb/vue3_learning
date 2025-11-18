## vue3学习

## 常用的Composition API

### 1、拉开序幕的setup
```markdown
1、理解：Vue3.0中一个新的配置项，值为一个函数
2、setup是所有Composition API（组合 API）`表演的舞台`
3、组件中所用到的：数据、方法等，均要配置在setup中
4、setup函数的两种返回值
    - 1、若返回一个对象，则对象中的属性、方法，在模板中均可以直接使用（重点关注）
    - 2、若返回一个渲染函数：则可以自定义渲染内容(了解)
5、注意点：
    - 1、尽量不要与Vue2.x配置混用
        - Vue2.0配置(data、methods、watch、computed)中可以访问到setup中的属性和方法
        - 但在setup中不能访问Vue2.x配置(data、methods、watch、computed)中的属性和方法
        - 如果存在重名，setup优先
    - 2、setup不能是一个async函数，因为返回值不再是对象，而是Promise，需要通过then处理
```

### 2、 ref函数
```markdown
- 作用：定义一个响应式数据
- 语法：const xxx = ref(initValue)
    - 创建一个包含响应式数据的引用对象(Reference Object)
    - JS操作：xxx.value
    - 模板中读取数据，不需要 xxx.value, 直接：<div>{{ xxx }}</div>
- 备注：
    - 接收的数据可以是：基本类型、也可以是对象类型
    - 基本类型数据：响应式依然是靠 Object.defineProperty()的 getter、setter来实现的
    - 对象类型数据：内部通过 vue3.0的新函数 `reactive()`函数转换成响应式数据
```

