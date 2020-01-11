const crypto = require('crypto')

const urlController = () => {

  const getShortUrl = function (req, res) {
    // req.body.lengthy_url
    // res.send({ providedUrl: req.body.lengthy_url, shortenedUrl: 'temped' })
    const hash = crypto.createHash('md5').update(req.body.lengthy_url).digest("hex")



    res.send({ providedUrl: req.body.lengthy_url, shortenedUrl: shortenedUrl, error: 'The custom name you have provided is not available. We have created a random one for you instead.' })
  }

  return {
    getShortUrl: getShortUrl
  }
}

module.exports = urlController
