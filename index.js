function genStr(options) {
  let length = options.length,
      inc = options.include

  let lower = "abcdefghjkmnopqrstuvwxyz"
  let upper = lower.toUpperCase()
  lower += 'i'
  upper += 'L'
  let special = "-_!@#$%^&*()"
  let numbers = "0123456789"

  let def = {
    lower, upper, special, numbers
  }

  let all = {};
  ["lower", "upper", "special", "numbers"].forEach(key => {
    let v = inc[key]
    if(typeof v === 'string') {
      return all[key] = v
    }
    if(v) {
      all[key] = def[key]
    }
  })

  let chars = Object.values(all).join('')
  let charsLength = chars.length
  let result = ""
  for(let i = 0; i < length; i++) {
    result += chars[~~(Math.floor(Math.random() * charsLength))]
  }
  return result
}

genStr.tie = function(options) {
  return genStr.bind(this, options)
}

module.exports = genStr
