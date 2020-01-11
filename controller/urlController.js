const crypto = require('crypto')
var db = require('../model/db')
const { promisify } = require('util')

const urlController = () => {

  const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const BASE     = ALPHABET.length

  const getShortUrl = async function (req, res) {
    const lengthyUrl = req.body.lengthy_url
    const customName = req.body.custom_name
    let custom_error, customUrl = ''

    const hashedUrl = crypto.createHash('md5').update(lengthyUrl).digest("hex")

    let promisifyDB = promisify(db.query).bind(db)

    const urls = await promisifyDB(`SELECT * FROM url WHERE hash = '${hashedUrl}'`)
  
    if (urls.length && customName) {
      return res.send({ providedUrl: urls[0].lengthy_url, shortenedUrl: urls[0].shortened_url, custom_error: 'The custom name you have provided is not available. We have created a random one for you instead.' })
    } else if (urls.length) {
      return res.send({ providedUrl: urls[0].lengthy_url, shortenedUrl: urls[0].shortened_url, custom_error })
    } 
    
    let shortenedUrl = ''
    if (customName) {
      customUrl = await promisifyDB(`SELECT * FROM url WHERE shortened_url = '${customName}'`)
      if (customUrl) {
        shortenedUrl = customName
      }       
    }

    let obj = {lengthy_url: lengthyUrl, hash: hashedUrl}

    db.query('INSERT INTO url SET ?', obj, function (error, results, fields) {
      if (error) throw error;
      if (customUrl && shortenedUrl === "") {
        custom_error = 'The custom name you have provided is not available. We have created a random one for you instead.'
      } else {
        shortenedUrl = encode(results.insertId)
      }

      db.query('UPDATE url SET shortened_url=? where id=?', [shortenedUrl, results.insertId], function (error, results, fields) {
        if (error) throw error;
        return res.send({ providedUrl: lengthyUrl, shortenedUrl: shortenedUrl, custom_error})
      });

    });
  }

  const reverseString = str => { 
    return str.split('').reverse().join('') 
 }

  const encode = num => {
    let str = '';
    while (num > 0) {
        str = str.concat(ALPHABET[num % BASE])
        num = Math.floor(num/BASE)
    }
    return reverseString(str)
  }

  const decode = str => {
    let num = 0;
    for (let i=0; i<str.length; i++) {
      num = num * BASE + ALPHABET.indexOf(str[i]);
    }
    return num;
  }

  return {
    getShortUrl: getShortUrl
  }
}

module.exports = urlController
