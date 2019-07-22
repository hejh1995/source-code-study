#### 1. redux简介：
- 是js的状态容器，提供可预测的状态管理
- 由flux演变而来，避免了flux的复杂性
- 函数式编程---- curring【函数柯里化】、compose【复合函数】、纯函数
#### 2. 目录文件结构
- utils
  - actionTypes.js：提供预设的 action
  - isPlainObject.js: 判断对象是否是一个普通对象
  - warning.js: 显示 warning 提示信息
- applyMiddleware.js：提供了 applyMiddleware API
- bindActionCreators.js：提供了 bindActionCreators API
- combineReducers.js： 提供 combineReducers API,同时包含了一些reducer 的验证函数
- compose.js：函数组合
- createStore.js：提供createStore API
- index.js：入口文件
