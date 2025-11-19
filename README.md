## vue3学习

## 快捷键
```javascript
快速删除整行 ctrl + shift + k
复制当前行 Shift + Alt + Down 光标会跟随
复制当前行 Shift + Alt + Up 光标保持原地不动
```

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

### 2、ref函数
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

### 3、reactive函数
```markdown
- 作用：定义一个对象类型的响应式数据(基本类型不要用它，要用ref函数)
- 语法：const 代理对象 = reactive({源对象}) 接收一个对象或数组，返回一个代理对象(proxy代理的实例对象，简称proxy对象)
- reactive定义的响应式数据是"深层次的"
- 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据进行操作
```

### 4、Vue3.0中的响应式原理

#### Vue2.x的响应式
- 实现原理：
  - 对象类型：通过Object.defineProperty()对属性的读取、修改进行拦截(数据劫持)
  - 数组类型：通过重写数组方法，拦截数组元素的读取、修改等操作（对数组的变更方法进行了包裹，例如：push()、splice等)
    ```javascript
        // 对数据进行响应式操作(新增或修改某个对象属性或数组的值)
        Vue.set( target, propertyName/index, value ) 
        或
        vm.$set( target, propertyName/index, value )
        
        // 删除对象属性或数组元素
        Vue.delete( target, propertyName/index )
    
        // 具体实现原理：
        Object.defineProperty(data, key, {
            get() {},
            set() {}
        })
    ```
  - 存在问题：

    - 新增属性、删除属性，界面无法更新
    - 直接通过下标修改数组，界面不会自动更新

#### Vue3.0的响应式
- 实现原理：

  - 通过Proxy(代理)：拦截对象中任意属性的变化，包括属性值的读写、属性的添加、属性的删除等
  - 通过Reflect(反射)：对被代理对象的属性进行操作
  ```javascript
    let p = new Proxy(person,{
            // 有人读取p的某个属性时调用
            get(target,propName){
                console.log(`person中${propName}属性被获取了`);
                //return target[propName]// 从对象中取出某个属性
                return Reflect.get(target,propName)// 通过反射方式获取
            },
            // 有人修改p的某个属性，或给p追加某个属性时调用
            set(target,propName,value){
                console.log(`person中${propName}属性被修改了`);
                // target[propName] = value;
                Reflect.set(target,propName,value)// 反射
            },
            // 有人删除p的某个属性时调用
            deleteProperty(target,propName){
                console.log(`person中${propName}属性被删除了`);
                //return target[propName]
                return Reflect.deleteProperty(target,propName)// 反射
            }
        })
  
  // 操作代理对象p即就是操作源对象person 则 person中的属性值也会发生改变，也就是vue3.0的响应式原理
  ```
  
#### 5、reactive对比ref
- 从定义数据角度对比：
  
  - ref用来定义：基本类型数据
  - reactive用来定义：对象（或数组）类型数据
  - 备注：ref也可以用来定义对象(或数组)类型结构，它内部会自动通过reactive转为代理对象

- 从原理角度对比：

  - ref通过 `Object.defineProperty()`的get/set来实现响应式(数据劫持)
  - reactive通过 `Proxy(代理)`来实现响应式(数据劫持)，并通过 + `Reflect(反射)`操作源对象内部的数据

- 从使用角度对比：

  - ref定义的数据：操作数据时需要`.value`,读取数据时模板中直接读取即可
  - reactive定义的数据：操作数据和读取数据时，均不需要`.value`