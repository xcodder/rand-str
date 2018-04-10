function genStr(options) {
    function shuffleString(str) {
      var a = str.split(""),
          n = a.length;
  
      for(var i = n - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = a[i];
          a[i] = a[j];
          a[j] = tmp;
      }
      return a.join("");
  }
  function getRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  let length = options.length,
      inc = options.include,
      must = options.must,
      ambigious = options.ambigious

  let lower = "abcdefghjkmnopqrstuvwxyz"
  let upper = lower.toUpperCase()
  lower += 'i'
  upper += 'L'
  if(ambigious) {
    lower += 'I'
    upper += 'l'
  }
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
  if(must) {
    for(let field in must) {
      let length = must[field]
      for(let i = 0; i < length; i++) {
        result += getRandomFromArray(all[field])
      }
    }
  }
  let remainingLength = length - result.length
  for(let i = 0; i < remainingLength; i++) {
    result += getRandomFromArray(chars)
  }
  if(must) {
    result = shuffleString(result)
  }
  if(result.length > length) {
    throw new Error("Length is less than summed must fields' values")
  }
  return result
}

genStr.tie = function(options) {
  return genStr.bind(this, options)
}

module.exports = genStr
