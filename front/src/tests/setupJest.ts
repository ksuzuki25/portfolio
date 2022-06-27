if (typeof global.TextEncoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  global.TextEncoder = require('util').TextEncoder
}

if (typeof global.TextDecoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  global.TextDecoder = require('util').TextDecoder
}
