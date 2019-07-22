export default function compass(...funs) {
  // 这里的处理，无论有没有参数，保持返回的都是一个函数，调用这个函数的时候返回 传入的参数。
  if (funs.length === 0) {
    return arg = > arg
  }
  if(funs.length === 1) {
     return funs[0]
  }
  // reduce 在介绍里面就有说，可以作为函数的compose。
  return funs.reduce((res, fun) => (...args) => res(fun(...args)))
}
