var express = require('express')

const routes = () => {
  const apiRouter = express.Router()

  const urlController = require('../controller/urlController')()

  apiRouter.route('/getShortUrl').post(urlController.getShortUrl)

  const adminController = require('../controller/adminController')()

  apiRouter.route('/getTimeSeriesData').post(adminController.getTimeSeriesData)

  return apiRouter
}

module.exports = routes
