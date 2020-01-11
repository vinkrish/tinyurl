let db = require('../model/db')
const { promisify } = require('util')

const originalUrlController = () => {

  const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const BASE     = ALPHABET.length

  const getOriginalUrl = async (encoded_url) => {
    let promisifyDB = promisify(db.query).bind(db)

    let id = decode(encoded_url.slice(1,))

    const urls = await promisifyDB(`SELECT * FROM url WHERE id = '${id}'`)

    if (urls.length) {
      return urls[0].lengthy_url
    } else {
      return null
    }
  }

  const decode = str => {
    let num = 0;
    for (let i=0; i<str.length; i++) {
      num = num * BASE + ALPHABET.indexOf(str[i]);
    }
    return num;
  }

  return {
    getOriginalUrl: getOriginalUrl
  }
}

module.exports = originalUrlController
