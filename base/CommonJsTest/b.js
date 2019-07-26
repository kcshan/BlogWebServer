// const { add, mul } = require("./a")
const opts = require("./a")
const add = opts.add
const mul = opts.mul
const sum = add(10, 20)
const res = mul(10, 20)
console.log(sum)
console.log(res)