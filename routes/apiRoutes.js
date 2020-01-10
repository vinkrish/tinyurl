var express = require('express')

const routes = () => {
  const apiRouter = express.Router()

  const urlController = require('../controller/urlController')()

  return apiRouter
}

module.exports = routes
