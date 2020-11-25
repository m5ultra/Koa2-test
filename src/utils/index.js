const sha1 = require('js-sha1')
hashCode = argv => {
  return sha1(argv)
}

module.exports = {
  hashCode
}
