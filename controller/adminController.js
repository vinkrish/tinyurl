let db = require('../model/db')
const { promisify } = require('util')

const adminController = () => {

  const getTimeSeriesData = async (req, res) => {
    let promisifyDB = promisify(db.query).bind(db)
    const urls = await promisifyDB('SELECT COUNT(*) as count, created_on FROM url GROUP BY created_on')
    return res.send(JSON.stringify(urls))
  }

  return {
    getTimeSeriesData: getTimeSeriesData
  }
}

module.exports = adminController
