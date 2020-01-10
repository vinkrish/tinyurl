var express = require('express')

const routes = () => {
  const apiRouter = express.Router()

  const urlController = require('../controller/urlController')()

  apiRouter.route('/getShortUrl').post(urlController.getShortUrl)

  return apiRouter
}

module.exports = routes
