# 爬坑笔记
```text
记录自己爬过的那些坑, 一般是指耽误在上面的时间长, 真正找到问题所在后又很快解决的问题
```

* RDS构建问题, 迟迟无法构建成功, => npm install 的源切制淘宝
```
# RDS node 基础构建
code.language=nodejs

build.command=npm --python=/usr/alibaba/install/python-3.5.0/bin/python3 --registry=https://registry.npm.taobao.org install --production

build.output=www/
``` 

* vue项目中第三方样式无法覆盖
```
如mt-ui, 覆盖的样式不要写在scope里面就好了
```

* webpack本地服务可以访问 localhost:port 但不能访问 本地路由IP:port
```
script
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --port 8080 --host 0.0.0.0",
```

* ios 不支持window.outerHeight  用 window.innerHeight 代替

* Vue-loader 在dev上不能转es5 可以不用管, 只要build可以就好了
```
有的时候dev上的问题可以对比下build之后
```

* transform 在 inline元素上不支持
```
https://www.w3.org/TR/css-transforms-1/#transformable-element
```

* import * 慎用
```text
import * as Alert from 'react-native'
导致把老的Navigator 也引入了
和推荐的react-navigator 不兼容
``` 
* Git 最著名报错 “ERROR: Permission to XXX.git denied to user”终极解决方案
```
https://www.jianshu.com/p/12badb7e6c10
```

* 浮点数 * 10的整倍数仍会有精度问题
```js
console.log(0.29 * 10) // 2.9 ...
console.log(0.29 * 100) // 28.99999999 ...
console.log(0.29 * 1000) // 290 ...
```