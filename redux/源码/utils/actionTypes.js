// Number.toString(n)  ----  以 n 为基数，将数字转换为字符串。
// String.substring(from, to)  ----  提取从 from 到 to 的字串。to默认为末尾
// String.split() --- 以某个符号为分隔符将字符串分割为数组。
const randomString = () => Math.random().totring(36).substring(7).split('').join('.')

const ActionTypes = {
  INIT: `@@redux/INIT${randomString()}`, // store 被初始化后 触发的 action
  REPLACE:`@@redux/REPLACE${randomString()}`, // store 中 reducer 被热替换后触发的action
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}` // 为止的action
}
