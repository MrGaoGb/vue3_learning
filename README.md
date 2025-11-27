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

#### 6、setup的两个注意点
- setup执行的时机:
  
  - 在beforeCreate之前执行一次，this当前是undefined。

- setup的参数：

  - props：值为对象，包含组件外部传递过来，且组件内部声明了接收的属性
  - context：上下文对象
    
    - attrs: 值为对象，包含组件外部传递过来，但没有在props配置中声明的属性，相当于`this.$attrs`
    - slots: 收到的插槽内容，相当于`this.$slots`
    - emit: 用于分发自定义事件的函数，相当于`this.$emit`

#### 7、计算属性与监视

##### 1、computed函数

  - 与vue2.x中computed配置功能一致
  - 写法：

      ```javascript
        import {reactive, computed} from 'vue'
      
        setup(props,context) {
            let person = reactive({
              firstName:'张',
              lastName:'三'
            })
      
            // 计算属性 - 简写形式
            //  person.fullName =  computed(()=>{
            //     return person.firstName+"_"+person.lastName;
            //  })
          
            // 计算属性 - 完整写法
            person.fullName =  computed({
              // 当fullName属性被引用时被调用
              get(){
              return person.firstName+"-"+person.lastName;
              },
              // 当fullName属性被修改时调用
              set(value){
              console.log(`---fullName属性被修改了,修改后的值${value}`);
              const nameArr = value.split('-');
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
            }
            })
          
            return {
               person
            }
        }
      ```
##### 2、watch函数

- 与vue2.x中watch配置功能一致
- 两个小坑
  
  - 监视reactive定义的响应式数据时：oldValue无法获取到
  - 监视reactive定义的响应式数据中的某个属性(且此时属性为对象)时，那么`deep`属性开启有效
- 写法：

```javascript
setup(props,context) {
    
    let sum = ref(0)
    let msg = ref('tom')

    let person = reactive({
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:30
        }
      }
    })

    // 普通函数写法
    watch(sum,function(newValue,oldValue){
      console.log('sum值被修改了', newValue,oldValue);
    })

    // 箭头函数写法 
    // 情况一：监视ref所定义的`一个`响应式数据
    watch(sum,(newValue,oldValue)=>{
      console.log('sum值被修改了', newValue,oldValue);
    },{immediate:true})

    // 情况二：监视ref所定义的`多个`响应式数据(跟数组的的排序有关)
    // 另外第三个参数 options 可配置属性，例如 immediate:true 或 deep:true
    watch([msg,sum],(newValue,oldValue)=>{
      console.log('sum或msg值被修改了', newValue,oldValue);
    },{immediate:true})


    // 情况三：监视reactive所定义的`一个`响应式数据全部属性
    /**
     * 注意：
     *  1、此处无法获取到oldValue
     *  2、强制开启了深度监视(deep配置无效)(版本已修复：deep配置有效)
     */
    watch(person,(newValue,oldValue)=>{
      console.log('person值变了',newValue,oldValue);
    },{deep:false})

    // 情况四：监视reactive所定义的`一个`响应式数据某个属性
    // 1、监听person中的age属性
    watch(() => person.age ,(newValue,oldValue)=>{
      console.log('person的age属性的值变了',newValue,oldValue);      
    })
    // 2、监听person中的name属性
    watch(() => person.name ,(newValue,oldValue)=>{
      console.log('person的name属性的值变了',newValue,oldValue);      
    })
    // 3、监听person中的salary属性
    watch(() => person.job.j1.salary,(newValue,oldValue)=>{
      console.log('person.job.j1中的salary属性变了',newValue,oldValue);
    })

    // 情况五：监视reactive所定义的`一个`响应式数据某些属性
    watch([() => person.name,() => person.age],(newValue,oldValue) => {
      console.log('仅监视person中name或age属性变了',newValue,oldValue);  
    })

    // 特殊情况
    watch(() => person.job, (newValue,oldValue) => {
      console.log('监视person中的job(仍是一个对象)变化',newValue,oldValue);    
    },{deep:true})// 此处由于监视是reactive所定义的对象中的某个属性，所以deep配置有效

    return {
      sum,
      msg,
      person
    }
    
  }
```

##### 3、watchEffect函数
- watch的套路是：既要指明监视的属性，也要指明监视的回调
- watchEffect的套路是：不用监视指明哪个属性，监视的回调中用到哪个属性，就会自动地被追踪
- watchEffect有点像computed：
  
  - 但computed注重的是计算出来的值（回调函数的返回值），所以必须写返回值
  - 而watchEffect更注重过程（回调函数的函数体），所以不用写返回值

  ```javascript
    watchEffect(() => {
      console.log('watchEffect指定的回调执行了');
      sum.value
      msg.value
      person.name
      person.age
      person.job.j1.salary
    })
  ```

#### 8、自定义hook函数
- 什么是hook?  本质是一个函数，把setup函数中使用的Composition API进行了封装
- 类似于vue2.x中的mixin
- 自定义hook的优势：复用代码，让setup中的逻辑更清楚易懂

#### 9、toRef和toRefs函数
- 作用：创建一个 ref 对象，其value值指向一个对象中的某个属性
- 语法：`const name = toRef(person,'name')`
- 引用：要将响应式对象中的某个属性单独提供给外部使用时
- 扩展：`toRef` 与 `toRefs`功能一致，但可以批量创建多个ref对象，语法：`toRefs(person)`

### 其他 Composition API
#### 1、shallowReactive 与 shallowRef
- shallowReactive：只处理对象最外层属性的响应式(浅响应式)
- shallowRef：只处理基本数据类型响应式，不进行对象的响应式处理(浅响应式)
- 什么时候使用?
  
  - 如果有一个对象数据，结构比较深，但变化时只是外层属性变化，使用 shallowReactive
  - 如果有一个对象数据，后续功能不会修改对象中的属性，而是生成新的对象来替换，使用 shallowRef

#### 2、readonly 与 shallowReadonly
- readonly: 让一个响应式数据变为只读（深只读）
- shallowReadonly: 让一个响应式数据变为只读（浅只读）
- 应用场景：不希望数据被修改时，使用

#### 3、toRaw 与 markRaw
- toRaw
  
  - 作用：将一个由`reactive`生成的响应式对象，转为普通对象
  - 使用场景：用于将响应式对象转为普通对象，对这个普通对象的所有操作，不会引起页面更新

- markRaw

  - 作用：标记一个对象，使其永远不会转换为代理(即响应式对象)
  - 使用场景：
    - 1、有些值不应被设置为响应式的，例如复杂的第三方类库
    - 2、当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能